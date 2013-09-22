level-push
==========

Pushes JSON to your LevelDB with auto-generated UUID. Uses [level-set](https://github.com/maiah/level-set) to convert JSON to LevelDB data structure.

### Install
```bash
npm install level-push
```

```js
var LevelUp = require('levelup'),
    LevelPush = require('level-push');

var db = LevelUp('./testdb');

LevelPush(db);
```

### Push JSON object
```js
var person = { name: 'Maiah', occupation: 'Ninja' };
db.push('/', person, function (err, uuid) {
  if (!err) {
    console.log('Saved person under root path');
    console.log(uuid); // e.g. 01a538b6-5219-495c-bb8d-bbf4117a6ae2
  }
});
```

This will put key-value pairs LevelDB data structure at the `root` path prepended with auto-generated `uuid`.
```
01a538b6-5219-495c-bb8d-bbf4117a6ae2/name = Maiah
01a538b6-5219-495c-bb8d-bbf4117a6ae2/occupation = Ninja
```

You can also save any valid JSON structure.
```js
var person = {
  name: 'Maiah',
  occupation: 'Ninja',
  tools: {
    lang: 'js'
  }
};

db.push('/', person, function (err, uuid) {
  if (!err) {
    console.log('Saved person under root path');
    console.log(uuid); // e.g. 01a538b6-5219-495c-bb8d-bbf4117a6ae2
  }
});

```

This will put key-value pairs LevelDB data structure at the `root` path prepended with auto-generated `uuid`.
```
01a538b6-5219-495c-bb8d-bbf4117a6ae2/name = Maiah
01a538b6-5219-495c-bb8d-bbf4117a6ae2/occupation = Ninja
01a538b6-5219-495c-bb8d-bbf4117a6ae2/tools/lang = js
```

You can also specify a path other than the `root`.
```js
var person = { name: 'Maiah', occupation: 'Ninja' };
db.push('/person', person, function (err, uuid) {
  if (!err) {
    console.log('Saved person object');
    console.log(uuid); // e.g. 01a538b6-5219-495c-bb8d-bbf4117a6ae2
  }
});

```

This will put key-value pairs LevelDB data structure at the `person` path with auto-generated `uuid` inserted right after the specified `path`.
```
person/01a538b6-5219-495c-bb8d-bbf4117a6ae2/name = Maiah
person/01a538b6-5219-495c-bb8d-bbf4117a6ae2/occupation = Ninja
```

### License
MIT
