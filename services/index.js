var CONSTANTS = require('../constants').constants
	,request = require('request-json')
	,client = request.newClient(CONSTANTS.SERVICE_URL)
	,services = {};

services.category = {
	find: function(callback, id){
		var route = 'categoryDS'
			,url = (typeof id === "undefined")?route:route + "?id=" + id;
		client.get(url, function(err, res, body){
			callback(err, res, body);
		});
	}	
};

services.user = {
	login: function(id, password, callback){
		var url = 'auth?id=' + id + '&pwd=' + password;
		client.post(url, {}, function(err, res, body){
			callback(err, res, body);
		});
	}	
};

exports.services = services;
