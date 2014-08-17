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
var Queue;

Queue = (function() {
  function Queue() {}

  Queue.prototype.size = 0;

  Queue.prototype.enqueue = function(value) {
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

  Queue.prototype.enqueueAll = function(values) {
    var value, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      _results.push(this.enqueue(value));
    }
    return _results;
  };

  Queue.prototype.isEmpty = function() {
    return this.size === 0;
  };

  Queue.prototype.dequeue = function() {
    var value;
    if (this.isEmpty()) {
      throw "Empty queue";
    }
    value = this.first.value;
    this.first = this.first.next;
    this.size--;
    return value;
  };

  Queue.prototype.forEach = function(fn) {
    var node;
    node = this.first;
    while (node) {
      fn(node.value);
      node = node.next;
    }
  };

  Queue.prototype.toArray = function() {
    var values;
    values = [];
    this.forEach(function(value) {
      return values.push(value);
    });
    return values;
  };

  return Queue;

})();

exports.Queue = Queue;

}));
