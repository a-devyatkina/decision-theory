const url = require('url')
const office = require("../office/index.js")
const fs = require('fs-extra')

module.exports.init = function (app) {

  function checkForReadAccess(req, res, next) {
    if (req.isAuthenticated()) {
      const query = url.parse(req.url, true).query;
      if (req.session.passport.user.role === "student" && query.user == req.session.passport.user.uid)
        return next();
      if (req.session.passport.user.role === "teacher")
        return next();
    }
    res.status(500).send('access denyed');
  }

  function checkForWriteAccess(req, res, next) {
    if (req.isAuthenticated()) {
      const query = url.parse(req.url, true).query;
      if (query.user == req.session.passport.user.uid)
        return next();
    }
    res.status(500).send('access denyed');
  }

  function checkForMasterAccess(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.session.passport.user.role === "teacher")
        return next();
    }
    res.status(500).send('access denyed');
  }

  app.get('/restapi/steplab/pattern/file', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.getPattern(query.lab, (err, file) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.download(file, err => {
        if (err) {
          console.error(err);
        }
        fs.unlink(file, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  });

  app.post('/restapi/steplab/pattern/file', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.setPattern(query.lab, req.files.pattern, (err) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      fs.unlink(req.files.pattern.tempFilePath, (err) => {
        if (err) {
          return console.error(err);
        }
      });
      return res.status(200).send();
    });
  });

  app.get('/restapi/steplab/pattern/schema', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.getPatternSchema(query.lab, (err, schema) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send(schema);
    });
  });

  app.put('/restapi/steplab/pattern/schema', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.setPatternSchema(query.lab, req.body, (err) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send();
    });
  });

  app.delete('/restapi/steplab/pattern/file', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.removePattern(query.lab, (err) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send();
    });
  });

  app.get('/restapi/steplab/instance/schema', checkForReadAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.getLabSchema(query.lab, query.user, (err, schema) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send(schema);
    });
  });

  app.get('/restapi/steplab/instance/image', checkForReadAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.getLabImage(query.lab, query.user, query.step, query.image, (err, result) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      const img = Buffer.from(result.data, 'base64');
      res.writeHead(200, {
        'Content-Type': result.mime,
        'Content-Length': img.length
      });
      return res.end(img);
    });
  });

  app.post('/restapi/steplab/instance/data', checkForReadAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.getLabData(query.lab, query.user, req.body, (err, result) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send(result);
    });
  });

  app.put('/restapi/steplab/instance/data', checkForWriteAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.setLabData(query.lab, query.user, req.body, (err) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send();
    });
  });

  app.post('/restapi/steplab/instance/create', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.createLab(query.lab, query.user, (err) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send();
    });
  });

  app.delete('/restapi/steplab/instance/remove', checkForMasterAccess, (req, res) => {
    const query = url.parse(req.url, true).query;
    office.removeLab(query.lab, query.user, (err) => {
      if(err) {
        console.log(JSON.stringify(err));
        return res.status(500).send(err);
      }
      return res.status(200).send();
    });
  });
}
