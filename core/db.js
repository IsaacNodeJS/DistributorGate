var config = require('../config/db');
var Q = require('q');
var _ = require('lodash');
var pg = require('pg');

function select (query, params) {
	var deferred = Q.defer();
	
	pg.connect(config.connString, function (err, client, done) {
		client.query(query, params, function (err, result) {
			if (err) {
				deferred.reject(new Error(err));
			}
			else {
				deferred.resolve(result.rows);
				done();
			}			
		});
	});

	return deferred.promise;
};

module.exports = {
	select : select
};