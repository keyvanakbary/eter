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
    window.<%= name %> = window.<%= name %> || {};
    definition(window.<%= name %>);
  }
}(function (exports) {
<%= contents %>
}));
