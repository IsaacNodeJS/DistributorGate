var express = require('express');
var config = require('./config/app');
var routes = require('./routes');

var app = express();

routes.call(app);

app.listen(config.port);