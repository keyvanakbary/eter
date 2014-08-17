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
var Stack;

Stack = (function() {
  function Stack() {}

  Stack.prototype.size = 0;

  Stack.prototype.push = function(value) {
    this.head = {
      value: value,
      previous: this.head
    };
    return this.size++;
  };

  Stack.prototype.pushAll = function(values) {
    var value, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      _results.push(this.push(value));
    }
    return _results;
  };

  Stack.prototype.isEmpty = function() {
    return this.size === 0;
  };

  Stack.prototype.pop = function() {
    var value;
    if (this.isEmpty()) {
      throw "Empty stack";
    }
    value = this.head.value;
    this.head = this.head.previous;
    this.size--;
    return value;
  };

  Stack.prototype.forEach = function(fn) {
    var node;
    node = this.head;
    while (node) {
      fn(node.value);
      node = node.previous;
    }
  };

  Stack.prototype.toArray = function() {
    var values;
    values = [];
    this.forEach(function(value) {
      return values.push(value);
    });
    return values;
  };

  return Stack;

})();

exports.Stack = Stack;

}));
