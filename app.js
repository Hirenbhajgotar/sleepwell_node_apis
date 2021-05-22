// mongo db shell - https://downloads.mongodb.org/windows/mongodb-shell-windows-x86_64-4.4.5.zip
// connection string - mongo "mongodb+srv://cluster0.ek1d2.mongodb.net/myFirstDatabase" --username hiren
// user - hiren
// pass - hiren@8918514
// mongodb+srv://hiren:hiren@8918514@cluster0.ek1d2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

var   createError  = require('http-errors');
var   express      = require('express');
var   path         = require('path');
var   cookieParser = require('cookie-parser');
var   logger       = require('morgan');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cors         = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var categoryRouter = require('./routes/category');
var subCategoryRouter = require('./routes/subCategory');
var bannerRouter = require('./routes/banner');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//* middelwares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//* route middlewares
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/posts', postsRouter);
app.use('/category', categoryRouter);
app.use('/sub-category', subCategoryRouter);
app.use('/banner', bannerRouter);



//* mongoose DB connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log('Connected to DB')
)

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
