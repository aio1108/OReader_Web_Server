
/*
 * GET home page.
 */
var path = require('path'),
	routes = {};

routes.index = function(req, res){
	//res.render('index', { title: 'Useful People1' });
	res.sendfile(path.resolve('./files/practice.html'));
	//res.sendfile(path.resolve('./files/test_client.html'));
};

routes.bootstrap = function(req, res){
	//res.render('index', { title: 'Useful People1' });
	res.sendfile(path.resolve('./files/index.html'));
	//res.sendfile(path.resolve('./files/test_client.html'));
};
routes.bootstrap2 = function(req, res){
	//res.render('index', { title: 'Useful People1' });
	res.sendfile(path.resolve('./files/index2.html'));
	//res.sendfile(path.resolve('./files/test_client.html'));
};


routes.io_test = function(req, res){
	res.sendfile(path.resolve('./files/test_client.html'));
};

exports.routes = routes;