class Stack
  size: 0

  push: (value) ->
    @head =
      value: value
      previous: @head
    @size++

  pushAll: (values) ->
    @push(value) for value in values

  isEmpty: ->
    @size is 0

  pop: ->
    throw "Empty stack" if @isEmpty()
    value = @head.value
    @head = @head.previous
    @size--
    value

  forEach: (fn) ->
    node = @head
    while node
      fn(node.value)
      node = node.previous
    return

  toArray: ->
    values = []
    @forEach (value) ->
      values.push(value)
    values

exports.Stack = Stack