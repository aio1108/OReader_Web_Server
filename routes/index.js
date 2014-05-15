
/*
 * GET home page.
 */
var path = require('path'),
	routes = {};

routes.index = function(req, res){
  res.render('index', { title: 'Useful People' });
};

routes.io_test = function(req, res){
	res.sendfile(path.resolve('./files/test_client.html'));
};

exports.routes = routes;