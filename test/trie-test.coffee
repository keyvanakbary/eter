eter = require "../src/trie.coffee"
chai = require "chai"
expect = chai.expect

describe "Trie", ->
  trie = null

  beforeEach ->
    trie = new eter.Trie()

  it "should retrieve all words", ->
    trie.insertAll(["one", "ones", "two", "onyx"])
    expect(trie.getAll()).to.be.eql ["two", "onyx", "ones", "one"]

  describe "contains", ->
    words = []
    
    beforeEach ->
      words = ["", "one", "two", "ones", "onyx"]
      trie.insertAll(words)

    it "should contain word", ->
      expect(trie.contains(word)).to.be.true for word in words

    it "should not contain word", ->
      expect(trie.contains(word)).to.be.false for word in ["on", "three", "foo"]

  describe "remove", ->

    it "should remove word", ->
      trie.insert("one")
      trie.remove("one")
      expect(trie.getAll()).to.be.eql []

    it "should do nothing when empty", ->
      trie.remove("one")
      expect(trie.getAll()).to.be.eql []

  describe "getPrefixed", ->

    beforeEach ->
      trie.insertAll(["one", "ones", "open", "two"])

    it "should return a subset of words", ->
      expect(trie.getPrefixed("o")).to.be.eql ["open", "ones", "one"]
      expect(trie.getPrefixed("on")).to.be.eql ["ones", "one"]

    it "should return nothing on no match", ->
      expect(trie.getPrefixed("k")).to.be.eql []
