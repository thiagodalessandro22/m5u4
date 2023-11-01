var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'OWMFIWESGDFSasdasF',
  cookie: {maxAge: null},
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res) => {
  try {
    console.log(req.session.idUsuario)
      if (req.session.idUsuario) {
        next();
      }
      else {
        res.redirect('/admin/login')
      }
  } 
  catch (error) {
    console.log(error)
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/home', secured, adminRouter);

// select
// pool.query('select titulo, director from peliculas').then(function
//   (resultados) {
//     console.log(resultados)
//   });


//insert
// var obj = {
//     titulo: 'Halloween',
//     estreno: '19 de Agosto 1978',
//     director: 'John Carpenter'
// }

//  pool.query('insert into peliculas set ?', [obj]).then(function
//       (resultados) {
//         console.log(resultados)
//  });



//update
// var id = 3;
// var obj = {
//       director: 'John Carlos Haroldo Carpenter',
//       estreno: '16 de noviembre de 1978'
// }

//  pool.query('update peliculas set ? where id=?', [obj, id]).then(function
//       (resultados) {
//         console.log(resultados)
//   });


//delete
// var id = 4;
// pool.query('delete from peliculas where id=?', [id]).then(function
//   (resultados) {
//     console.log(resultados)
// });


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
