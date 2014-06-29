
/**
 * Module dependencies.
 */

var express = require('express')
	,MongoStore = require('connect-mongo')(express)
	,router = require('./routes')
	,http = require('http')
	,path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: 'secret',
	store: new MongoStore({
	  			db: 'SessionDB',
	  			host: 'kahana.mongohq.com',
	  			port: 10080,
	  			username: 'usefulpeople',
	  			password: 'iamuseful',
	  			clear_interval: 60 * 600
	 	   })
}));
app.use(app.router);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', router.routes.index);

app.post('/login', router.routes.login);

app.get('/logout', router.routes.logout);

app.get('/test/client', router.routes.io_test);

app.get('/demo', router.routes.bootstrap);

app.get('/bootstrap2', router.routes.bootstrap2);

app.listen(app.get('port'));
console.log('Server listen on port: ' + app.get('port'));

