
/*
 * GET home page.
 */

var routes = {};

routes.io_test = function(req) {
	req.io.emit('talk', {
		message: 'This message is send by server. io test success.'
	});
};

exports.routes = routes;