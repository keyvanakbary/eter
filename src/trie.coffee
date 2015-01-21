class Trie
  
  constructor: ->
    @root = createNode("")
  
  createNode = (char) ->
    {char: char, children: [], word: false}
  
  insert: (word) ->
    [node, length] = pathFor.call(@, word)
    for char in word.substr(length)
      newNode = createNode(char)
      node.children.push(newNode)
      node = newNode
    node.word = true

  insertAll: (words) ->
    @insert(word) for word in words
  
  pathFor = (word) ->
    length = 0
    parent = @root
    index = 0
    node = @root
    for char in word
      match = false
      for i, child of node.children
        if child.char is char
          parent = node
          node = child
          index = i
          length++
          match = true
      return [node, length, parent, index] unless match
    [node, length, parent, index]

  contains: (word) ->
    [node, length] = pathFor.call(@, word)
    word.length is length and node.word

  remove: (word) ->
    [node, length, parent, index] = pathFor.call(@, word)
    return if word.length isnt length
    if hasChildren(node)
      removeChild(parent, index)
    else
      node.word = false
 
  hasChildren = (node) ->
    node.children.length is 0
  
  removeChild = (node, index) ->
    node.children.splice(index, 1)
  
  getPrefixed: (prefix) ->
    [node, length] = pathFor.call(@, prefix)
    return [] if prefix.length isnt length
    values(node, prefix.substr(0, length - 1))
  
  getAll: ->
    values(@root, "")
  
  values = (node, word) ->
    word += node.char
    words = []
    words.push(word) if node.word
    for child in node.children
      words = words.concat(values(child, word))
    words

exports.Trie = Trie
