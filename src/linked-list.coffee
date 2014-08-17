class LinkedList
  size: 0

  add: (value) ->
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

  addAll: (values) ->
    @add(value) for value in values

  get: (index) ->
    assertIndexInBounds(@, index)
    n = null
    iterate @, (i, node) ->
      if i is index
        n = node
        return false
    n.value

  assertIndexInBounds = (list, index) ->
    throw "Index out of bounds" if index < 0 or index > list.size - 1

  insert: (index, value) ->
    assertIndexInBounds(@, index)
    previous = null
    iterate @, (i, node) =>
      if i is index
        n =
          value: value
          next: node
        @first = n unless previous
        previous.next = n
        @size++
        return false
      else
        previous = node

  contains: (value) ->
    found = false
    @forEach (i, val) ->
      if val is value
        found = true
        return false
    found

  isEmpty: ->
    @size is 0

  remove: ->
    throw "Empty list" if @isEmpty()
    value = @first.value
    @first = @first.next
    @size--
    value

  forEach: (fn) ->
    iterate @, (i, node) ->
      fn(i, node.value)

  iterate = (list, fn) ->
    i = 0
    node = list.first
    while node
      return if fn(i, node) is false
      node = node.next
      i++
    return

  toArray: ->
    values = []
    @forEach (i, value) ->
      values.push(value)
    values

exports.LinkedList = LinkedList
