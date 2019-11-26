var config = require('../config.json')
var admin = require("firebase-admin")
var serviceAccount = require("./cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.database
});

module.exports = admin
