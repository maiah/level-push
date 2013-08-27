var LevelSet = require('level-set');

module.exports = function(db) {
	LevelSet(db);

	db.push = push;
	return db;
};

var uuid = function() {
	return "10000000-1000-4000-8000-100000000000".replace(
		/[018]/g,
		function(a) {
			return (
				a ^ Math.random() * 16 >> a / 4
			).toString(16)
		}
	)
};

var push = function(path, obj, cb) {
	var id = uuid();

	// Split, clean and rebuild
	var keyPath = "/" + path.split("/").filter(function(v) {
		return v
	}).join("/") + "/";

	this.set(keyPath + id, obj, function(err) {
		if (err) cb(err);
		else cb(null, id);
	});
};
