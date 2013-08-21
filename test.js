var assert = require('assert');

var LevelUp = require('levelup'),
    LevelPush = require('./index');

var db = LevelUp('./testdb');

LevelPush(db);

var ninja = {
	name: 'Maiah',
	occupation: 'Ninja'
};

db.push('/', ninja, function (err, uuid) {
	assert(!err);

	db.get(uuid + '/name', function (err, value) {
		assert(!err);
		assert.strictEqual(value, 'Maiah');
	});

	db.get(uuid + '/occupation', function (err, value) {
		assert(!err);
		assert.strictEqual(value, 'Ninja');
	});
});

db.push('/persons', ninja, function (err, uuid) {
	assert(!err);

	db.get('persons/' + uuid + '/name', function (err, value) {
		assert(!err);
		assert.strictEqual(value, 'Maiah');
	});

	db.get('persons/' + uuid + '/occupation', function (err, value) {
		assert(!err);
		assert.strictEqual(value, 'Ninja');
	});
});