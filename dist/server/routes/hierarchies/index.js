const labRoutes = require('./lab_routes')
const testRoutes = require('./test_routes')

module.exports.init = function(app, db, ObjectID) {
  labRoutes(app, db, ObjectID)
  testRoutes(app, db, ObjectID)
};
