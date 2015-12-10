# Eter

[![Build Status](https://secure.travis-ci.org/keyvanakbary/eter.svg?branch=master)](http://travis-ci.org/keyvanakbary/eter)

*Éter* is a conglomerate of lightweight collections for JavaScript running on [node](http://nodejs.org/) and browser.

## Usage
For node, [install the package](https://www.npmjs.org/package/eter) and include it

```js
var eter = require('eter');
```

For the browser, just include the modules you want

```html
<script src="dist/eter.js"></script>
```

## Types
If you use [TypeScript](http://www.typescriptlang.org/), _typings_ are included

```typescript
import {Stack} from 'eter';

let s: Stack<number> = new Stack();
```

## Collections

### Stack
A [Stack](http://en.wikipedia.org/wiki/Stack_(abstract_data_type)) is a [Last-In-First-Out (LIFO)](http://en.wikipedia.org/wiki/LIFO_(computing)) data structure.

```js
var s = new eter.Stack();

s.push(1);
s.push(2);
s.pop();//2
s.pop();//1
s.isEmpty();//true
s.pop();//Error "Empty stack"
```

### Queue
A [Queue](http://en.wikipedia.org/wiki/Queue_(abstract_data_type)) is a [First-In-First-Out (FIFO)](http://en.wikipedia.org/wiki/FIFO_(computing)) data structure.

```js
var q = new eter.Queue();

q.enqueue(1);
q.enqueue(2);
q.dequeue();//1
q.dequeue();//2
q.isEmpty();//true
q.dequeue();//Error "Empty queue"
```

### LinkedList
A [Linked List](http://www.wikiwand.com/en/Linked_list) is a data structure consisting of a group of nodes which together represent a sequence.

```js
var l = new eter.LinkedList();

l.add(1);
l.get(0);//1
l.remove(0);
l.isEmpty();//true
l.get(0);//Error "Index 0 out of bounds"
```

### Trie
A [Trie](http://en.wikipedia.org/wiki/Trie) is an ordered tree data structure that is used to store a dynamic set or associative array where the keys are usually strings.

```js
var t = new eter.Trie();

t.insert('one');
t.insert('oh');
t.insert('on');
t.contains('one');//true
t.insert('foo');
t.remove('foo');
t.contains('foo');//false
```

### Hash Map
A [Hash Map](http://en.wikipedia.org/wiki/Hash_table) is a data structure used to implement an associative array, a structure that can map keys to values.

```js
var m = new eter.HashMap();

m.put('key', 'value');
m.get('key');//value

m.contains('key');//true

m.remove('key');
m.contains('key');//false
```
