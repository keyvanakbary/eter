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
var LinkedList;

LinkedList = (function() {
  var assertIndexInBounds, iterate;

  function LinkedList() {}

  LinkedList.prototype.size = 0;

  LinkedList.prototype.add = function(value) {
    var node;
    node = {
      value: value,
      next: null
    };
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return this.size++;
  };

  LinkedList.prototype.addAll = function(values) {
    var value, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      _results.push(this.add(value));
    }
    return _results;
  };

  LinkedList.prototype.get = function(index) {
    var n;
    assertIndexInBounds(this, index);
    n = null;
    iterate.call(this, function(i, node) {
      if (i === index) {
        n = node;
        return false;
      }
    });
    return n.value;
  };

  assertIndexInBounds = function(list, index) {
    if (index < 0 || index > list.size - 1) {
      throw "Index out of bounds";
    }
  };

  LinkedList.prototype.insert = function(index, value) {
    var previous;
    assertIndexInBounds(this, index);
    previous = null;
    return iterate.call(this, (function(_this) {
      return function(i, node) {
        var n;
        if (i === index) {
          n = {
            value: value,
            next: node
          };
          if (!previous) {
            _this.first = n;
          }
          previous.next = n;
          _this.size++;
          return false;
        } else {
          return previous = node;
        }
      };
    })(this));
  };

  LinkedList.prototype.contains = function(value) {
    var found;
    found = false;
    this.forEach(function(i, val) {
      if (val === value) {
        found = true;
        return false;
      }
    });
    return found;
  };

  LinkedList.prototype.isEmpty = function() {
    return this.size === 0;
  };

  LinkedList.prototype.remove = function() {
    var value;
    if (this.isEmpty()) {
      throw "Empty list";
    }
    value = this.first.value;
    this.first = this.first.next;
    this.size--;
    return value;
  };

  LinkedList.prototype.forEach = function(fn) {
    return iterate.call(this, function(i, node) {
      return fn(i, node.value);
    });
  };

  iterate = function(fn) {
    var i, node;
    i = 0;
    node = this.first;
    while (node) {
      if (fn(i, node) === false) {
        return;
      }
      node = node.next;
      i++;
    }
  };

  LinkedList.prototype.toArray = function() {
    var values;
    values = [];
    this.forEach(function(i, value) {
      return values.push(value);
    });
    return values;
  };

  return LinkedList;

})();

exports.LinkedList = LinkedList;

}));
