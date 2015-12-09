(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.eter = require('./eter');

},{"./eter":2}],2:[function(require,module,exports){
var stack_1 = require('./stack');
var queue_1 = require('./queue');
var linked_list_1 = require('./linked_list');
var hash_map_1 = require('./hash_map');
var trie_1 = require('./trie');
module.exports = {
    Stack: stack_1.Stack,
    Queue: queue_1.Queue,
    LinkedList: linked_list_1.LinkedList,
    HashMap: hash_map_1.HashMap,
    Trie: trie_1.Trie
};

},{"./hash_map":3,"./linked_list":4,"./queue":5,"./stack":6,"./trie":7}],3:[function(require,module,exports){
var HashMap = (function () {
    function HashMap(size) {
        this.size = size;
        this.table = new Array(size);
        for (var i = 0; i < size; i++) {
            this.table[i] = [];
        }
    }
    HashMap.prototype.put = function (key, value) {
        var chain = this.chainForKey(key);
        var index = this.find(key, chain);
        var node = new Node(key, value);
        if (index < 0) {
            chain.push(node);
        }
        else {
            chain[index] = node;
        }
    };
    HashMap.prototype.chainForKey = function (key) {
        return this.table[this.hash(key)];
    };
    HashMap.prototype.hash = function (key) {
        var h = 0;
        for (var i = 0; i < key.length; i++) {
            h = (32 * h + key.charCodeAt(i)) % this.size;
        }
        return h;
    };
    HashMap.prototype.find = function (key, chain) {
        for (var i = 0; i < chain.length; i++) {
            if (chain[i].key == key) {
                return i;
            }
        }
        return -1;
    };
    HashMap.prototype.get = function (key) {
        var chain = this.chainForKey(key);
        var index = this.find(key, chain);
        return (index < 0) ? null : chain[index].value;
    };
    HashMap.prototype.remove = function (key) {
        var chain = this.chainForKey(key);
        var index = this.find(key, chain);
        if (index >= 0) {
            chain.splice(index, 1);
        }
    };
    HashMap.prototype.containsKey = function (key) {
        var chain = this.chainForKey(key);
        return this.find(key, chain) >= 0;
    };
    return HashMap;
})();
exports.HashMap = HashMap;
var Node = (function () {
    function Node(key, value) {
        this.key = key;
        this.value = value;
    }
    return Node;
})();

},{}],4:[function(require,module,exports){
var LinkedList = (function () {
    function LinkedList() {
        this.size = 0;
    }
    LinkedList.prototype.add = function (value) {
        var node = new Node(value);
        if (this.isEmpty()) {
            this.head = node;
        }
        else {
            var n = this.head;
            for (; n.next;) {
                n = n.next;
            }
            n.next = node;
        }
        this.size++;
    };
    LinkedList.prototype.isEmpty = function () {
        return this.size == 0;
    };
    LinkedList.prototype.get = function (index) {
        this.assertIndexInBounds(index);
        var node = this.head;
        for (var i = 0; i < this.size; i++) {
            if (index == i) {
                return node.value;
            }
            node = node.next;
        }
    };
    LinkedList.prototype.assertIndexInBounds = function (index) {
        if ((index > this.size - 1) || index < 0) {
            throw new Error("Index " + index + " out of bounds");
        }
    };
    LinkedList.prototype.remove = function (index) {
        this.assertIndexInBounds(index);
        if (index == 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        var previous = this.head;
        for (var i = 1; previous.next; i++) {
            var current = previous.next;
            if (index == i) {
                previous.next = current.next;
                this.size--;
                return;
            }
            previous = current;
        }
    };
    return LinkedList;
})();
exports.LinkedList = LinkedList;
var Node = (function () {
    function Node(value) {
        this.value = value;
    }
    return Node;
})();

},{}],5:[function(require,module,exports){
var Queue = (function () {
    function Queue() {
        this.size = 0;
    }
    Queue.prototype.enqueue = function (value) {
        if (this.isEmpty()) {
            this.first = this.last = new Node(value, null);
        }
        else {
            var node = new Node(value, this.last);
            this.last.next = node;
            this.last = node;
        }
        this.size++;
    };
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            throw new Error('Empty queue');
        }
        var value = this.first.value;
        this.first = this.first.next;
        this.size--;
        return value;
    };
    Queue.prototype.isEmpty = function () {
        return this.size == 0;
    };
    return Queue;
})();
exports.Queue = Queue;
var Node = (function () {
    function Node(value, next) {
        this.value = value;
        this.next = next;
    }
    return Node;
})();

},{}],6:[function(require,module,exports){
var Stack = (function () {
    function Stack() {
        this.size = 0;
    }
    Stack.prototype.push = function (n) {
        this.head = new Node(n, this.head);
        this.size++;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            throw new Error('Empty stack');
        }
        var value = this.head.value;
        this.head = this.head.previous;
        this.size--;
        return value;
    };
    Stack.prototype.isEmpty = function () {
        return this.size == 0;
    };
    return Stack;
})();
exports.Stack = Stack;
var Node = (function () {
    function Node(value, previous) {
        this.value = value;
        this.previous = previous;
    }
    return Node;
})();

},{}],7:[function(require,module,exports){
var Trie = (function () {
    function Trie() {
        this.root = new Node('');
    }
    Trie.prototype.insert = function (word) {
        var node = this.root;
        var length = 0;
        for (; length < word.length; length++) {
            var child = node.find(word[length]);
            if (child) {
                node = child;
            }
            else {
                break;
            }
        }
        if (length == word.length) {
            node.isWord = true;
        }
        else {
            node.add(word.substr(length));
        }
    };
    Trie.prototype.remove = function (word) {
        var parent, node = this.root;
        for (var i = 0; i < word.length; i++) {
            var child = node.find(word[i]);
            if (child) {
                parent = node;
                node = child;
            }
            else {
                return;
            }
        }
        if (node.hasChildren()) {
            node.isWord = false;
        }
        else {
            parent.remove(word[word.length - 1]);
        }
    };
    Trie.prototype.contains = function (word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            var child = node.find(word[i]);
            if (child) {
                node = child;
            }
            else {
                return false;
            }
        }
        return node.isWord;
    };
    return Trie;
})();
exports.Trie = Trie;
var Node = (function () {
    function Node(char) {
        this.char = char;
        this.children = [];
        this.isWord = false;
    }
    Node.prototype.find = function (char) {
        var found = this.children.filter(function (child) {
            return child.char == char;
        });
        return (found.length > 0) ? found[0] : null;
    };
    Node.prototype.remove = function (char) {
        this.children = this.children.filter(function (child) {
            return child.char != char;
        });
    };
    Node.prototype.hasChildren = function () {
        return this.children.length > 0;
    };
    Node.prototype.add = function (word) {
        var node = new Node(word.charAt(0));
        if (word.length == 1) {
            node.isWord = true;
        }
        else {
            node.add(word.substr(1));
        }
        this.children.push(node);
    };
    return Node;
})();

},{}]},{},[1]);