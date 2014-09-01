(function (definition) {
  if (typeof exports === "object") {
    definition(module.exports);
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      var module = {};
      definition(module);
      return module;
    });
  } else {
    window.eter = window.eter || {};
    definition(window.eter);
  }
}(function (exports) {
var Trie;

Trie = (function() {
  var createNode, hasChildren, pathFor, removeChild, values;

  function Trie() {
    this.root = createNode("");
  }

  createNode = function(char) {
    return {
      char: char,
      children: [],
      word: false
    };
  };

  Trie.prototype.insert = function(word) {
    var char, length, newNode, node, _i, _len, _ref, _ref1;
    _ref = pathFor(this.root, word), node = _ref[0], length = _ref[1];
    _ref1 = word.substr(length);
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      char = _ref1[_i];
      newNode = createNode(char);
      node.children.push(newNode);
      node = newNode;
    }
    return node.word = true;
  };

  Trie.prototype.insertAll = function(words) {
    var word, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = words.length; _i < _len; _i++) {
      word = words[_i];
      _results.push(this.insert(word));
    }
    return _results;
  };

  pathFor = function(node, word) {
    var char, child, i, index, length, match, parent, _i, _len, _ref;
    length = 0;
    parent = node;
    index = 0;
    for (_i = 0, _len = word.length; _i < _len; _i++) {
      char = word[_i];
      match = false;
      _ref = node.children;
      for (i in _ref) {
        child = _ref[i];
        if (child.char === char) {
          parent = node;
          node = child;
          index = i;
          length++;
          match = true;
        }
      }
      if (!match) {
        return [node, length, parent, index];
      }
    }
    return [node, length, parent, index];
  };

  Trie.prototype.contains = function(word) {
    var length, node, _ref;
    _ref = pathFor(this.root, word), node = _ref[0], length = _ref[1];
    return word.length === length && node.word;
  };

  Trie.prototype.remove = function(word) {
    var index, length, node, parent, _ref;
    _ref = pathFor(this.root, word), node = _ref[0], length = _ref[1], parent = _ref[2], index = _ref[3];
    if (word.length !== length) {
      return;
    }
    if (hasChildren(node)) {
      return removeChild(parent, index);
    } else {
      return node.word = false;
    }
  };

  hasChildren = function(node) {
    return node.children.length === 0;
  };

  removeChild = function(node, index) {
    return node.children.splice(index, 1);
  };

  Trie.prototype.getPrefixed = function(prefix) {
    var length, node, _ref;
    _ref = pathFor(this.root, prefix), node = _ref[0], length = _ref[1];
    if (prefix.length !== length) {
      return [];
    }
    return values(node, prefix.substr(0, length - 1));
  };

  Trie.prototype.getAll = function() {
    return values(this.root, "");
  };

  values = function(node, word) {
    var child, words, _i, _len, _ref;
    word += node.char;
    words = [];
    if (node.word) {
      words.push(word);
    }
    _ref = node.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      words = words.concat(values(child, word));
    }
    return words;
  };

  return Trie;

})();

exports.Trie = Trie;

}));
