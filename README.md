# Eter

[![Build Status](https://secure.travis-ci.org/keyvanakbary/eter.svg?branch=master)](http://travis-ci.org/keyvanakbary/eter)

*Éter* is a conglomerate of lightweight collections for JavaScript running on [node](http://nodejs.org/) and browser.

## Usage

For node, [install the package](https://www.npmjs.org/package/eter) and include it
```javascript
var eter = require('eter');
```

For the browser, just include the modules you want
```html
<script src="build/stack.js"></script>
```

## Collections

### Stack
```javascript
var s = new eter.Stack();

s.pushAll([1, 2, 3]);
s.toArray();//[3, 2, 1]

s.pop();//3
s.toArray();//[2, 1]
```

### Queue
```javascript
var q = new eter.Queue();

q.enqueueAll([1, 2, 3]);
q.toArray();//[1, 2, 3]

q.remove();//1
q.toArray();//[2, 3]
```

### LinkedList
```javascript
var l = new eter.LinkedList();

l.addAll([1, 2, 3]);
l.toArray();//[1, 2, 3]

l.get(2);//3

l.insert(1, 2);
l.toArray();//[1, 2, 2, 3]

l.remove();
l.toArray();//[2, 2, 3]

l.contains(2);//true
```

### Trie
```javascript
var t = new eter.Trie();

t.insertAll(['one', 'oh', 'on']);
t.getAll();//['on', 'oh', 'one']

t.contains('one');//true

t.insert('foo');
t.getAll();//['foo', 'on', 'oh', 'one']

t.remove('foo');
t.getAll();//['on', 'oh', 'one']

t.getPrefixed('on');//['on', 'one']
```
