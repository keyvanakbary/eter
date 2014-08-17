class Queue
  size: 0

  enqueue: (value) ->
    node =
      value: value
      next: null
    if @isEmpty()
      @first = node
      @last = node
    else
      @last.next = node
      @last = node
    @size++

  enqueueAll: (values) ->
    @enqueue(value) for value in values

  isEmpty: ->
    @size is 0

  dequeue: ->
    throw "Empty queue" if @isEmpty()
    value = @first.value
    @first = @first.next
    @size--
    value

  forEach: (fn) ->
    node = @first
    while node
      fn(node.value)
      node = node.next
    return

  toArray: ->
    values = []
    @forEach (value) ->
      values.push(value)
    values

exports.Queue = Queue
