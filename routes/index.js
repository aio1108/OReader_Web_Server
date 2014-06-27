var path = require('path'),
	services = require('../services').services,
	routes = {};

routes.index = function(req, res){
	var data = { auth: false };
	console.log(req.session);
	if(req.session.auth){
		data.auth = true;
		data.user = req.session.user;
	}
	services.category.find(function(err, response, body){
		if(err){
			res.render('layout', data);
			return;
		}
		data.categories = body;
		res.render('layout', data);
	});
};

routes.login = function(req, res){
	var userid = req.body.userid
		,userpwd = req.body.userpwd;
	services.user.login(userid, userpwd, function(err, response, body){
		if(err){
			res.redirect('/');
			return;
		}
		console.log(req.session);
		if(body.auth){
			req.session.auth = true;
	        req.session.user = body.user;
		}
		console.log(req.session);
		res.redirect('/');
	});
};

routes.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
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