
/*
 * GET home page.
 */

var routes = {};

routes.io_test = function(req) {
	req.io.emit('talk', {
		message: 'io event from an io route on the server'
	});
};

exports.routes = routes;