// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');

const mongoURI = require('./config/keys').mongoURI;

const passport = require('passport');

// Initialize the app
const app = express();

// Import routes
let apiRoutes = require('./api-routes');
// Configure bodyparser to handle post requests
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://localhost:19006');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
   'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
   'Authorization,X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// Connect to Mongoose and set connection variable
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf
//@ds349857.mlab.com:49857/heroku_5686p02g',
// { useNewUrlParser: true });

let db = mongoose.connection;

// Added check for DB connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	// we're connected!
	console.info('MongoDB database connection established successfully');
});

// Setup server port
let port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
	console.info('Running RestHub on port ' + port);
});
