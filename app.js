var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var save_response = require('./routes/save_response');
var nunjucks = require('nunjucks');

var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/save_response', save_response);

try {
    fs.readFile(path.join(__dirname, '/lib/training_data.json'), 'utf8', (err, data) => {
        if (err) throw err;
        app.set('training_data', JSON.stringify(JSON.parse(data), null, 4).trim());
    });
} catch(e) {
    console.log(e);
}

try {
    fs.readFile(path.join(__dirname, '/lib/response_data.json'), 'utf8', (err, data) => {
        if (err) throw err;
        app.set('response_data', JSON.stringify(JSON.parse(data), null, 4).trim());
    });
} catch(e) {
    console.log(e);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.stack);
  // render the error page
  res.status(err.status || 500).send();
});

module.exports = app;
