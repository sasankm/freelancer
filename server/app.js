var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var getConnection = require('./database/mysql.js');

var index = require('./routes/index');
var users = require('./routes/users');
var project = require('./routes/project');
var bids = require('./routes/bids');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({origin: 'http://18.144.4.224:3001', credentials: true}));

var session = require('client-sessions');

app.use(session({
  cookieName: 'session',
  secret: 'I[Py{dgY3RCwsADP*#cnpxjzXTPsn',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: {
  	httpOnly: false
  }
}));

app.use(function(req, res, next) {
  if (req.session && req.session.username && req.session.email) {
    var query = "SELECT * FROM Users WHERE username = " + mysql.escape(req.session.username);
    getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
	    conn.query(query, function(err, resp){

	    	if(err || !resp || resp.length == 0) return next();

	    	console.log("session ", resp);
	    	req.loggedIn = resp.length != 0 ? true : false;
	    	req.user = req.session.username;
	    	req.email = req.session.email;

	    	next();
	    });
	});
  } else {
    next();
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/project', project);
app.use('/bids', bids);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
