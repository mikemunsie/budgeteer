var app;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var dust = require('dustjs-linkedin');
var dustCommonHelpers = new (require("common-dustjs-helpers")).CommonDustjsHelpers();

// Routes
var routes_api = require('./routes/api');
var routes_views = require('./routes/views');

// Link common helpers to DustJS
dustCommonHelpers.export_helpers_to(dust);

// view engine setup
app = express();
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, 'views'));

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', routes_api);
app.use('/', routes_views);

// 404 page
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message
  });
});

module.exports = app;