const express = require('express');
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const config = require('./config.json');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const cors = require('cors')
const fileupload = require('express-fileupload');
const auth = require('./routes/authorization.js');
const labs = require('./routes/steplabs.js');
const mongoUrl = ('mongodb://localhost:27017/')
const dbName = 'labs'
let db
const app = express();

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: __dirname + "/office/temp/"
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

auth.init(app);
labs.init(app);

app.use(history());
app.use(express.static('dist/spa-mat'));

app.get('/', (req, res) => res.sendFile('/spa-mat/index.html'));

MongoClient.connect(mongoUrl, (err, client) => {
    if (err) throw err
    db = client.db(dbName)
    require('./routes/sibling_hierarchies')(app, db, ObjectID)
    app.listen(config.port, () => {
        console.log(`listening on port ${config.port}`)
    })
})
