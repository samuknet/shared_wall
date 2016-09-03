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
    app.use(morgan(':url :user-agent :remote-addr'));
}

app.use(function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use(express.static(__dirname + '/public'));

app.listen(80);