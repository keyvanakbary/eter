eter = require "../src/hash-map.coffee"
chai = require "chai"
expect = chai.expect

describe "HashMap", ->
  map = null

  beforeEach ->    
    map = new eter.HashMap(11)

  describe "set", ->
    it "should set value", ->
      map.set("key", "value")
      expect(map.get("key")).to.be.eql "value"

    it "should replace value", ->
      map.set("key", "value")
      map.set("key", "new value")
      expect(map.get("key")).to.be.eql "new value"

  describe "contains", ->
    it "should contain value", ->
      map.set("key", "value")
      expect(map.contains("key")).to.be.true

    it "should not contain value", ->
      expect(map.contains("key")).to.be.false

  describe "contains", ->
    it "should remove value", ->
      map.set("key", "value")
      map.remove("key")
      expect(map.contains("key")).to.be.false

    it "should not remove anything", ->
      map.remove("key")
      expect(map.contains("key")).to.be.false

  describe "get", ->
    it "should return null when not found", ->
      expect(map.get("key")).to.be.null

  