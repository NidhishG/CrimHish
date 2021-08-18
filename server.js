async function keepAlive(){
  var express = require('express');
  var app = express()
  app.get('/', (req, res) => {
    res.send('Website in work')
  })
  app.listen(8000)

}
module.exports = keepAlive


/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var about = require('./routes/about')
var commands = require('./routes/commands')
var usersRouter = require('./routes/users')

var app = express();

// view engine setup
app.set('views', './views');

app.engine('html', (path, ops = {}, cb) => {
  (require('fs')).readFile(path, (err, doc) => {
    if (err) return cb(err);
    try {
      cb(null, doc.toString());
    } catch (error) {
      cb(error);
    }
  });
});


app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
app.use('/commands', commands);



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
*/