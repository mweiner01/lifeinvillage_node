const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var dashboardRouter = require('./routes/dashboard');
var apiUserRouter = require('./routes/api-v1/users/user')
var ranklistRouter = require('./routes/ranklist');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(logger(`dev`));
app.use(express.json());
app.use( express.static( "public" ) );
app.use(session({secret: 'secret-key',saveUninitialized: true, resave: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/api/v1', apiUserRouter)
app.use('/ranklist', ranklistRouter)

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
}); 



module.exports = app;
