var _ = require('lodash');
var Q = require('q');
var errorHandler = require('./error-handler');

function adapter (action) {
	return function (req, res) {
		//params for the action
		var params = _.extend({}, req.params, req.query, req.body);

		//action success event handler
		var onFullfilled = function (data) {
			res.json(data);
		};

		//action fail event handler
		var onRejected = errorHandler(res);

		//try to execute action wrapped in promise
		try {
			Q(action(params, req, res))
			.done(onFullfilled, onRejected);
		}
		catch (error) {
			onRejected(error);
		}
	};
};

function adapt (controller) {
	var actions = require(controller);
	var result = {};

	for (var name in actions) {
		result[name] = adapter(actions[name]);
	}

	return result;
}

var data = adapt('./controllers/data');

module.exports = function(){
	this.get('/getData/:key', data.list);
};