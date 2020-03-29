var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES
// const sql = require('mssql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*connect database*/
var config = {
  server: 'localhost',
  port:1433,
  authentication: {
      type: 'default',
      options: {
          userName: 'sa',
          password: 'admin'
      }
  },
  options: {
      database: 'ManagerAbsent1',
      instanceName: 'SQLEXPRESS',
      rowCollectionOnDone: true,
      useColumnNames: false
  }
}
var connection = new Connection(config);
connection.on('connect', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});



module.exports = app;
