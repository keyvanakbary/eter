eter = require "../src/linked-list.coffee"
chai = require "chai"
expect = chai.expect

describe "LinkedList", ->
  list = null

  beforeEach ->    
    list = new eter.LinkedList()

  it "should add values in order", ->
    list.addAll([1, 2])
    expect(list.toArray()).to.be.eql [1, 2]

  describe "insert", ->
    it "should throw exception for out of bounds index", ->
      expect(-> list.insert(1, 1)).to.throw "Index out of bounds"

    it "should insert value between values", ->
      list.addAll([1, 3])
      list.insert(1, 2)
      expect(list.toArray()).to.be.eql [1, 2, 3]

  describe "remove", ->
    it "should throw exception on empty", ->
      expect(-> list.remove()).to.throw "Empty list"

    it "should remove the first", ->
      list.addAll([1, 2, 3])
      list.remove()
      expect(list.toArray()).to.be.eql [2, 3]

  describe "get", ->
    it "should throw exception for out of bounds index", ->
      expect(-> list.get(1)).to.throw "Index out of bounds"

    it "should retrieve value at index", ->
      list.addAll([1, 2, 3])
      expect(list.get(2)).to.be.eql 3

  describe "contains", ->
    it "should contain value", ->
      list.addAll([1, 2, 3])
      expect(list.contains(3)).to.be.true

    it "should not contain value", ->
      list.addAll([1, 2, 3])
      expect(list.contains(4)).to.be.false
