eter = require "../src/queue.coffee"
chai = require "chai"
expect = chai.expect

describe "Queue", ->
  queue = null

  beforeEach ->    
    queue = new eter.Queue()

  it "should enqueue values in order", ->
    queue.enqueueAll([1, 2, 3])
    expect(queue.toArray()).to.be.eql [1, 2, 3]

  describe "dequeue", ->
    it "should throw exception on empty", ->
      expect(-> queue.dequeue()).to.throw("Empty queue")

    it "should retrieve first element", ->
      queue.enqueue(1)
      expect(queue.dequeue()).to.be.eql 1

    it "should remove first element", ->
      queue.enqueueAll([1, 2])
      queue.dequeue()
      expect(queue.toArray()).to.be.eql [2]