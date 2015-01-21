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
A [Stack](http://en.wikipedia.org/wiki/Stack_(abstract_data_type)) is a [Last-In-First-Out (LIFO)](http://en.wikipedia.org/wiki/LIFO_(computing)) data structure.
```javascript
var s = new eter.Stack();

s.pushAll([1, 2, 3]);
s.toArray();//[3, 2, 1]

s.pop();//3
s.toArray();//[2, 1]
```

### Queue
A [Queue](http://en.wikipedia.org/wiki/Queue_(abstract_data_type)) is a [First-In-First-Out (FIFO)](http://en.wikipedia.org/wiki/FIFO_(computing)) data structure.
```javascript
var q = new eter.Queue();

q.enqueueAll([1, 2, 3]);
q.toArray();//[1, 2, 3]

q.remove();//1
q.toArray();//[2, 3]
```

### LinkedList
A [Linked List](http://www.wikiwand.com/en/Linked_list) is a data structure consisting of a group of nodes which together represent a sequence.
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
A [Trie](http://en.wikipedia.org/wiki/Trie) is an ordered tree data structure that is used to store a dynamic set or associative array where the keys are usually strings.
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

### Hash Map
A [Hash Map](http://en.wikipedia.org/wiki/Hash_table) is a data structure used to implement an associative array, a structure that can map keys to values.
```javascript
var m = new eter.HashMap();

m.set('key', 'value');
m.set('key');//value

m.contains('key');//true

m.remove('foo');
m.contains('key');//false
```
