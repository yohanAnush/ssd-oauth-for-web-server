
const url = require('url');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const express = require('express');

const indexRouter = require('./routes/index');
const authenticateRouter = require('./routes/authenticate');
const noteRouter = require('./routes/note');

const app = express();

// Default view.
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  key: 'uid',
  secret: '123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 3600
  }
}))

app.use('/', indexRouter);
app.use('/authenticate', authenticateRouter);
app.use('/note', noteRouter);

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
