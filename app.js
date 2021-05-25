var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var loginRegRouter = require('./routes/loginReg');
var libRouter = require('./routes/mcLib');
var userRouter = require('./routes/user');
var bgRouter = require('./routes/background');
var reuserRouter = require('./routes/reuser');
var remimaRouter = require('./routes/remima');
var playRouter = require('./routes/player');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/LoginReg',loginRegRouter);
app.use('/self',userRouter);
app.use('/mcLib',libRouter);
app.use('/background',bgRouter);
app.use('/reuser',reuserRouter);
app.use('/remima',remimaRouter);
app.use('/player',playRouter);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(error)
});

module.exports = app;
