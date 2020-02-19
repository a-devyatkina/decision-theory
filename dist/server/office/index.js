const java = require('java');
const path = require('path');
const fs = require('fs-extra')
const gc = require("js-gc");
const recursive = require("recursive-readdir");
const config = require("../config.json");
const firebase = require("../firebase/index.js")
const bucket = firebase.storage().bucket(config.storageBucket);
const database = firebase.database();

var platform = process.platform;
if (platform == "win32" || platform == "win64") {
  java.classpath.push(config.officeHomeWin);
} else {
  java.classpath.push(config.officeHome);
}

java.classpath.push(__dirname + "/labs-editor-asm.jar");

let labs = {};
const localStorage = __dirname + "/temp/";
const sweepTimeout = 3600000;

function fileFilter(file, stats) {
  let age = new Date().getTime() - stats.mtime.getTime();
  return stats.isDirectory() || age < sweepTimeout;
}

function sweep() {
  gc();
  java.callStaticMethod("java.lang.System", "gc", () => {
    recursive(localStorage, ["*.ods", fileFilter], (err, files) => {
      if (err) {
        console.log(err);
      }
      files.forEach(file => {
        let lab = file.replace(localStorage, "");
        if (!(lab in labs) || labs[lab].locked == true) {
          return;
        }
        labs[lab].locked = true;
        java.callStaticMethod("ru.mephi.labs.Editor", "used", file, (err, used) => {
          if (err) {
            console.error(err);
          }
          if (err || used) {
            labs[lab].locked = false;
            return;
          }
          fs.unlink(file, (err) => {
            labs[lab].locked = false;
            if (err && err.code != "ENOENT") {
              console.error(err);
              return;
            }
            delete labs[lab];
          });
        });
      });
    });
  });
  setTimeout(sweep, sweepTimeout);
}

function upload(labId, userId, lab, callback) {
  if (lab in labs) {
    labs[lab].locked = true;
    const filepath = localStorage + lab;
    let options = {
      destination: lab,
      metadata: {
        metadata: {
          schema: JSON.stringify(labs[lab].schema)
        }
      }
    };
    bucket.upload(filepath, options, (err) => {
      labs[lab].locked = false;
      if (err) {
        return callback(err);
      }
      getStatus(lab, (err, status) => {
        if (err) {
          return callback(err);
        }
        database.ref('steplabs').child(labId + "/" + userId).set(status, (err) => {
          callback(err);
        });
      });
    });
  } else {
    callback("lab is not downloaded");
  }
}

function download(rem, loc, callback) {
  const filepath = localStorage + loc;
  if (loc in labs) {
    if (labs[loc].locked) {
      return callback("file is locked", null);
    }
    return callback(null, filepath);
  } else {
    labs[loc] = { locked: true, schema: "" };
    fs.exists(filepath, function(exists) {
      if (exists) {
        return bucket.file(rem).getMetadata((err, metadata) => {
          if (err) {
            delete labs[loc];
            return callback(err, null);
          }
          labs[loc].locked = false;
          if (metadata && metadata.metadata && metadata.metadata.schema) {
            labs[loc].schema = JSON.parse(metadata.metadata.schema);
            return callback(null, filepath);
          }
          return callback("no lab schema not found");
        });
      }
      fs.ensureDir(path.dirname(filepath), (err) => {
        if (err) {
          delete labs[loc];
          return callback(err, null);
        }
        return bucket.file(rem).download({ destination: filepath }, (err) => {
          if (err) {
            delete labs[loc];
            return callback(err, null);
          }
          bucket.file(rem).getMetadata((err, metadata) => {
            if (err) {
              delete labs[loc];
              return callback(err, null);
            }
            labs[loc].locked = false;
            if (metadata && metadata.metadata && metadata.metadata.schema) {
              labs[loc].schema = JSON.parse(metadata.metadata.schema);
              return callback(null, filepath);
            }
            return callback("no lab schema not found");
          });
        });
      });
    });
  }
}

function getDoc(rem, loc, callback) {
  download(rem, loc, (err, path) => {
    if (err) {
      return callback(err, null);
    }
    java.callStaticMethod("ru.mephi.labs.Editor", "open", path, (err, doc) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, doc);
    });
  });
}

function getStatus(lab, callback) {
  getDoc(lab, lab, (err, doc) => {
    if (err) {
      return callback(err);
    }
    let status = { state: "", score: 0 };
    doc.get(JSON.stringify(status), (err, res) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, JSON.parse(res));
    });
  });
}

module.exports.createLab = function (labId, userId, callback) {
  const lab = "steplabs/" + labId + "/" + userId + ".ods";
  if (lab in labs) {
    return callback("lab already created");
  }
  bucket.file(lab).exists((err, exists) => {
    if (err) {
      return callback(err);
    }
    if (exists == true) {
      return callback("lab already created");
    }
    const pattern = "steplabs/" + labId + "/pattern.ods";
    return getDoc(pattern, lab, (err) => {
      if (err) {
        return callback(err);
      }
      upload(labId, userId, lab, (err) => {
        return callback(err);
      });
    });
  });
}

module.exports.removeLab = function (labId, userId, callback) {
  const lab = "steplabs/" + labId + "/" + userId + ".ods";
  if (!(lab in labs)) {
    labs[lab] = { locked: true };
  } else {
    labs[lab].locked = true;
  }
  database.ref('steplabs').child(labId + "/" + userId).remove(err => {
    if (err) {
      labs[lab].locked = false;
      return callback(err);
    }
    return bucket.file(lab).delete(err => {
      if (err && err.errors[0].reason !== "notFound") {
        labs[lab].locked = false;
        return callback(err);
      }
      const filepath = localStorage + lab;
      fs.unlink(filepath, (err) => {
        delete labs[lab];
        return callback(err && err.code != "ENOENT" ? err : null);
      });
    });
  });
}

module.exports.getLabData = function (labId, userId, req, callback) {
  const lab = "steplabs/" + labId + "/" + userId + ".ods";
  return getDoc(lab, lab, (err, doc) => {
    if (err) {
      return callback(err, null);
    }
    doc.get(JSON.stringify(req), (err, res) => {
      return callback(err, err ? null : JSON.parse(res));
    });
  });
}

module.exports.setLabData = function (labId, userId, req, callback) {
  const lab = "steplabs/" + labId + "/" + userId + ".ods";
  return getDoc(lab, lab, (err, doc) => {
    if (err) {
      return callback(err);
    }
    doc.put(JSON.stringify(req), (err) => {
      if (err) {
        return callback(err);
      }
      upload(labId, userId, lab, (err) => {
        return callback(err);
      });
    });
  });
}

module.exports.getLabSchema = function (labId, userId, callback) {
  const lab = "steplabs/" + labId + "/" + userId + ".ods";
  download(lab, lab, (err) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, labs[lab].schema);
  });
}

module.exports.getLabImage = function (labId, userId, step, image, callback) {
  const lab = "steplabs/" + labId + "/" + userId + ".ods";
  return getDoc(lab, lab, (err, doc) => {
    if (err) {
      return callback(err, null);
    }
    doc.image(step, image, (err, res) => {
      return callback(err, err ? null : JSON.parse(res));
    });
  });
}

module.exports.getPatternSchema = function (labId, callback) {
  const pattern = "steplabs/" + labId + "/pattern.ods";
  return bucket.file(pattern).getMetadata((err, metadata) => {
    if (err) {
      return callback(err, null);
    }
    if (metadata && metadata.metadata && metadata.metadata.schema) {
      return callback(null, JSON.parse(metadata.metadata.schema));
    }
    return callback("no pattren schema not found");
  });
}

module.exports.setPatternSchema = function (labId, schema, callback) {
  const pattern = "steplabs/" + labId + "/pattern.ods";
  const metadata = {
    metadata : {
      schema: JSON.stringify(schema)
    }
  };
  return bucket.file(pattern).setMetadata(metadata, (err) => {
    return callback(err);
  });
}

module.exports.setPattern = function (labId, file, callback) {
  return bucket.upload(file.tempFilePath, { destination: "steplabs/" + labId + "/pattern.ods" }, (err) => {
    callback(err);
  });
}

module.exports.getPattern = function (labId, callback) {
  let remote = "steplabs/" + labId + "/pattern.ods";
  let local = localStorage + remote;
  fs.ensureDir(path.dirname(local), (err) => {
    if (err) {
      return callback(err, null);
    }
    return bucket.file(remote).download({ destination: local }, (err) => {
      return callback(err, local);
    });
  });
}

module.exports.removePattern = function (labId, callback) {
  const remote = "steplabs/" + labId + "/pattern.ods";
  return bucket.file(remote).delete((err) => {
    return callback(err && err.errors[0].reason !== "notFound" ? err : null);
  });
}

sweep();
