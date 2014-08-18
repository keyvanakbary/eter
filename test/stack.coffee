eter = require "../src/stack.coffee"
chai = require "chai"
expect = chai.expect

describe "Stack", ->
  stack = null

  beforeEach ->
    stack = new eter.Stack()

  it "should pile values", ->
    stack.pushAll([1, 2, 3])
    expect(stack.toArray()).to.be.eql [3, 2, 1]

  describe "pop", ->
    it "should throw exception on empty stack", ->
      expect(-> stack.pop()).to.throw "Empty stack"

    it "should remove the head", ->
      stack.pushAll([1, 2])
      stack.pop()
      expect(stack.toArray()).to.be.eql [1]

    it "should retrieve the head", ->
      stack.pushAll([1, 2])
      expect(stack.pop()).to.be.eql 2
