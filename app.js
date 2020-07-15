const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const serverRoutes = require('./serverRoutes')
var bodyParser = require('body-parser');
const app = express();
// const port = process.env.PORT || 5000;
const config = require("./config/key");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// create connection
mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err, db) => {
  if (!err) {
    // console.log(db.collection('zips'))
    console.log('MongoDB Connection Succeeded.')
  } else {
    console.log('Error in DB connection: ' + err)
  }
});

// Routes
serverRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError());
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

app.listen(config.port, () => console.log(`Application listening at ${config.mongoURI}:${config.port}`))

module.exports = app;


// mongoimport --uri "mongodb+srv://test123:test123@testcluster-qitcd.mongodb.net/test?retryWrites=true&w=majority" --collection products --drop --file C:/Users/Tasleem/Desktop/test.json
// C:\Program Files\MongoDB\Server\4.2\bin>mongoimport --uri "mongodb+srv://test123:test123@testcluster-qitcd.mongodb.net/test?retryWrites=true&w=majority" --collection products --drop --file C:/Users/Tasleem/Desktop/fc.json --jsonArray
// https://www.firstcry.com/svcs/ProductFilter.svc/GetSubcategoryWisePagingProducts?PageNo=6&PageSize=20&SortExpression=Popularity&SubCatId=27&BrandId=&Price=&Age=&Color=&OptionalFilter=&OutOfStock=&Type1=&Type2=&Type3=&Type4=&Type5=&Type6=&Type7=&Type8=&Type9=&Type10=&combo=&discount=&searchwithincat=&ProductidQstr=&searchrank=&pmonths=&cgen=&PriceQstr=&DiscountQstr=&sorting=&rating=&offer=&CatId=1&skills=&material=&measurement=&gender=&exclude=&p=&premium=
// https://www.studytonight.com/mongodb/