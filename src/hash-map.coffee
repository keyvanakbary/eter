class HashMap

  constructor: (@size) ->
    @table = new Array(@size)
    @table[i] = [] for i in [0..@size]

  set: (key, value) ->
    chain = chainForKey.call(@, key)
    index = indexFor(chain, key)
    chain[index] = [key, value] if index isnt null
    chain.push([key, value])

  contains: (key) ->
    @get(key) isnt null

  get: (key) ->
    find(chainForKey.call(@, key), key)

  remove: (key) ->
    chain = chainForKey.call(@, key)
    index = indexFor(chain, key)
    chain.splice(index, 1) if index isnt null

  indexFor = (chain, key) ->
    find(chain, key, (index, _) -> index)

  chainForKey = (key) ->
    @table[hash.call(@, key)]

  find = (chain, key, findFn = (_, value) -> value) ->
    for [k, value], index in chain
      return findFn(index, value) if key is k
    null

  hash = (key) ->
    h = 0
    for c in "#{key}"
      h = (32*h + c.charCodeAt(0)) % @size
    h

exports.HashMap = HashMap 