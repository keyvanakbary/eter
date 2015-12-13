(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BinaryTree = (function () {
    function BinaryTree() {
    }
    BinaryTree.prototype.insert = function (key, value) {
        this.root = this.insertAt(key, value, this.root);
    };
    BinaryTree.prototype.insertAt = function (key, value, node) {
        if (!node) {
            return new Node(key, value);
        }
        if (key == node.key) {
            node.value = value;
            return node;
        }
        if (key > node.key) {
            node.right = this.insertAt(key, value, node.right);
        }
        else {
            node.left = this.insertAt(key, value, node.left);
        }
        return node;
    };
    BinaryTree.prototype.get = function (key) {
        for (var node = this.root; node;) {
            if (key == node.key) {
                return node.value;
            }
            else if (key > node.key) {
                node = node.right;
            }
            else {
                node = node.left;
            }
        }
        return null;
    };
    BinaryTree.prototype.remove = function (key) {
        this.root = this.removeAt(key, this.root);
    };
    BinaryTree.prototype.removeAt = function (key, node) {
        if (!node) {
            return null;
        }
        if (key == node.key) {
            if (!node.left) {
                return node.right;
            }
            else if (!node.right) {
                return node.left;
            }
            else {
                var max = this.findMax(node.left);
                node.value = max.value;
                node.key = max.key;
                node.left = this.removeAt(key, node.left);
            }
        }
        else if (key > node.key) {
            node.right = this.removeAt(key, node.right);
        }
        else {
            node.left = this.removeAt(key, node.left);
        }
        return node;
    };
    BinaryTree.prototype.findMax = function (node) {
        while (node.right) {
            node = node.right;
        }
        return node;
    };
    BinaryTree.prototype.each = function (fn) {
        this.eachFor(this.root, fn);
    };
    BinaryTree.prototype.eachFor = function (node, fn) {
        if (!node) {
            return;
        }
        fn(node.value, node.key);
        if (node.right) {
            this.eachFor(node.right, fn);
        }
        if (node.left) {
            this.eachFor(node.left, fn);
        }
    };
    return BinaryTree;
})();
exports.BinaryTree = BinaryTree;
var Node = (function () {
    function Node(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
    return Node;
})();

},{}],2:[function(require,module,exports){
window.eter = require('./eter');

},{"./eter":3}],3:[function(require,module,exports){
var stack_1 = require('./stack');
var queue_1 = require('./queue');
var linked_list_1 = require('./linked_list');
var hash_map_1 = require('./hash_map');
var trie_1 = require('./trie');
var binary_tree_1 = require('./binary_tree');
module.exports = {
    Stack: stack_1.Stack,
    Queue: queue_1.Queue,
    LinkedList: linked_list_1.LinkedList,
    HashMap: hash_map_1.HashMap,
    Trie: trie_1.Trie,
    BinaryTree: binary_tree_1.BinaryTree
};

},{"./binary_tree":1,"./hash_map":4,"./linked_list":5,"./queue":6,"./stack":7,"./trie":8}],4:[function(require,module,exports){
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
    HashMap.prototype.each = function (fn) {
        this.table.forEach(function (chain) {
            chain.forEach(function (node) { return fn(node.value, node.key); });
        });
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

},{}],5:[function(require,module,exports){
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
    LinkedList.prototype.each = function (fn) {
        var node = this.head;
        for (var i = 0; i < this.size; i++) {
            fn(node.value, i);
            node = node.next;
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

},{}],6:[function(require,module,exports){
var Queue = (function () {
    function Queue() {
        this.size = 0;
    }
    Queue.prototype.enqueue = function (value) {
        if (this.isEmpty()) {
            this.first = this.last = new Node(value);
        }
        else {
            var node = new Node(value);
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
    Queue.prototype.each = function (fn) {
        for (var node = this.first; node;) {
            fn(node.value);
            node = node.next;
        }
    };
    return Queue;
})();
exports.Queue = Queue;
var Node = (function () {
    function Node(value) {
        this.value = value;
    }
    return Node;
})();

},{}],7:[function(require,module,exports){
var Stack = (function () {
    function Stack() {
        this.size = 0;
    }
    Stack.prototype.push = function (value) {
        this.head = new Node(value, this.head);
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
    Stack.prototype.each = function (fn) {
        for (var node = this.head; node;) {
            fn(node.value);
            node = node.previous;
        }
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

},{}],8:[function(require,module,exports){
var Trie = (function () {
    function Trie() {
        this.root = new Node('');
    }
    Trie.prototype.insert = function (word, value) {
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
            node.value = value;
        }
        else {
            node.add(word.substr(length), value);
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
            node.value = null;
        }
        else {
            parent.remove(word[word.length - 1]);
        }
    };
    Trie.prototype.get = function (word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            var child = node.find(word[i]);
            if (child) {
                node = child;
            }
            else {
                return null;
            }
        }
        return node.value ? node.value : null;
    };
    Trie.prototype.each = function (fn) {
        this.eachFor(this.root, '', fn);
    };
    Trie.prototype.eachFor = function (node, prefix, fn) {
        var _this = this;
        if (node.value) {
            fn(prefix + node.char, node.value);
        }
        node.children.forEach(function (child) {
            _this.eachFor(child, prefix + node.char, fn);
        });
    };
    return Trie;
})();
exports.Trie = Trie;
var Node = (function () {
    function Node(char) {
        this.char = char;
        this.children = [];
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
    Node.prototype.add = function (word, value) {
        var node = new Node(word.charAt(0));
        if (word.length == 1) {
            node.value = value;
        }
        else {
            node.add(word.substr(1), value);
        }
        this.children.push(node);
    };
    return Node;
})();

},{}]},{},[2]);
