const labRoutes = require('./lab_routes')
const testRoutes = require('./test_routes')
const logRoutes = require('./log_routes')

module.exports = function(app, db, ObjectID) {
  labRoutes(app, db, ObjectID)
  testRoutes(app, db, ObjectID)
  logRoutes(app, db, ObjectID)
};
