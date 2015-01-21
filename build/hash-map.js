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
var HashMap;

HashMap = (function() {
  var chainForKey, find, hash, indexFor;

  function HashMap(size) {
    var i, _i, _ref;
    this.size = size;
    this.table = new Array(this.size);
    for (i = _i = 0, _ref = this.size; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      this.table[i] = [];
    }
  }

  HashMap.prototype.set = function(key, value) {
    var chain, index;
    chain = chainForKey.call(this, key);
    index = indexFor(chain, key);
    if (index !== null) {
      chain[index] = [key, value];
    }
    return chain.push([key, value]);
  };

  HashMap.prototype.contains = function(key) {
    return this.get(key) !== null;
  };

  HashMap.prototype.get = function(key) {
    return find(chainForKey.call(this, key), key);
  };

  HashMap.prototype.remove = function(key) {
    var chain, index;
    chain = chainForKey.call(this, key);
    index = indexFor(chain, key);
    if (index !== null) {
      return chain.splice(index, 1);
    }
  };

  indexFor = function(chain, key) {
    return find(chain, key, function(index, _) {
      return index;
    });
  };

  chainForKey = function(key) {
    return this.table[hash.call(this, key)];
  };

  find = function(chain, key, findFn) {
    var index, k, value, _i, _len, _ref;
    if (findFn == null) {
      findFn = function(_, value) {
        return value;
      };
    }
    for (index = _i = 0, _len = chain.length; _i < _len; index = ++_i) {
      _ref = chain[index], k = _ref[0], value = _ref[1];
      if (key === k) {
        return findFn(index, value);
      }
    }
    return null;
  };

  hash = function(key) {
    var c, h, _i, _len, _ref;
    h = 0;
    _ref = "" + key;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      h = (32 * h + c.charCodeAt(0)) % this.size;
    }
    return h;
  };

  return HashMap;

})();

exports.HashMap = HashMap;

}));
