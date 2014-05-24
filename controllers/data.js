var service = require('../core/services/data');

module.exports = {
	list : function (params) {
		return service.list(params);
	}
};