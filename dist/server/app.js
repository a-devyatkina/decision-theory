const express = require('express');
const config = require('./config.json');
const history = require('connect-history-api-fallback');
const bodyParser = require("body-parser");
const fileupload = require('express-fileupload');
const auth = require('./routes/authorization.js');
const labs = require('./routes/steplabs.js');
const app = express();

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: __dirname + "/office/temp/"
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


auth.init(app);
labs.init(app);

app.use(history());
app.use(express.static('dist/spa-mat'));

app.get('/', (req, res) => res.sendFile('/spa-mat/index.html'));

app.listen(config.port, () => console.log(`listening on port ${config.port}`));
