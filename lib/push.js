var LevelSet = require('level-set'),
    uuid = require('uuid');

module.exports = function (db) {
  LevelSet(db);

  db.push = push;
  return db;
};

function push(path, obj, cb) {
  var id = uuid.v4();

  var keyPath = '/';
	if (path !== '/' && path.length > 1) {
    keyPath += path.substr(1) + '/';
	}

  this.set(keyPath + id, obj, function (err) {
    if (err) cb(err);
    else cb(null, id);
  });
}