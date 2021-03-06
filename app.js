var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRegRouter = require('./routes/loginReg');
var libRouter = require('./routes/mcLib');
var userRouter = require('./routes/user');
var bgRouter = require('./routes/background');
var reuserRouter = require('./routes/reuser');
var remimaRouter = require('./routes/remima');
var songListRouter = require('./routes/songList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//解析post请求
app.use(cookieParser("login"));
app.use(session({
  name:'userlogin',
  secret:'login', 
  cookie:{maxAge:600000000},//一周
  resave:false,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/',loginRegRouter);
app.use('/user',userRouter);
app.use('/',libRouter);
app.use('/background',bgRouter);
app.use('/reuser',reuserRouter);
app.use('/remima',remimaRouter);
app.use('/songList',songListRouter);
 

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
