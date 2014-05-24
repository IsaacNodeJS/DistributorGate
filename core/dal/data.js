var db = require('../db');

function list (params) {
	return db.select(' \
			SELECT	O.title, O.body \
			FROM	public."Objects" AS O \
					INNER JOIN public."Rules" AS R \
					ON O.id = R."objectID" \
			WHERE	R.key = $1; \
		', [params.key]);
};

module.exports = {
	list : list
};