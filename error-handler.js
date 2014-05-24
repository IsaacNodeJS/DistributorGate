module.exports = function (res) {
	return function (error) {
		if (error) {
			res.json(error);
		}
		else {
			console.log(error);
			res.status(500);
			res.end();
		}
	};
};