var express = require('express');

var config = require('./config/config');


var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shared_wall');

// Api routes
require('./app/routes/api')(app);

if (config.traceRequests) {
    app.use(morgan());
}
app.use(express.static(__dirname + '/public'));

app.listen(80);