var LevelSet = require('level-set');

module.exports = function(db) {
  LevelSet(db);

  db.push = push;
  return db;
};

function push(path, obj, cb) {
  var id = uuid();
  var keyPath = buildKeyPath(path);

  this.set(keyPath + id, obj, function(err) {
    if (err) cb(err);
    else cb(null, id);
  });
}

function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(
    /[018]/g,
    function (a) {
      return (
        a ^ Math.random() * 16 >> a / 4
      ).toString(16)
    }
  );
}

function buildKeyPath(path) {
  var keyPath = '/';

  // Split, clean and rebuild
  if (path !== '/' && path.length > 1) {
    keyPath += path.split("/").filter(function(v) {
      return v;
    }).join("/") + "/";
  }

  return keyPath;
}