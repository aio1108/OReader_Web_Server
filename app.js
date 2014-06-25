
/**
 * Module dependencies.
 */

var express = require('express.io')
	,router = require('./routes')
	,io_router = require('./io_routes')
	,http = require('http')
	,path = require('path');

var app = express();
app.http().io();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', router.routes.index);

app.get('/test/client', router.routes.io_test);

app.io.route('ready', io_router.routes.io_test);

app.listen(app.get('port'));
console.log('Server listen on port: ' + app.get('port'));

