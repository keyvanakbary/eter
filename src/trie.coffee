class Trie
  
  constructor: ->
    @root = createNode("")
  
  createNode = (char) ->
    {char: char, children: [], word: false}
  
  insert: (word) ->
    [node, length] = pathFor(@root, word)
    for char in word.substr(length)
      newNode = createNode(char)
      node.children.push(newNode)
      node = newNode
    node.word = true

  insertAll: (words) ->
    @insert(word) for word in words
  
  pathFor = (node, word) ->
    length = 0
    parent = node
    index = 0
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
    [node, length] = pathFor(@root, word)
    word.length is length and node.word

  remove: (word) ->
    [node, length, parent, index] = pathFor(@root, word)
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
    [node, length] = pathFor(@root, prefix)
    return [] if prefix.length isnt length
    values(node, prefix.substr(0, length - 1))
  
  getAll: ->
    values(@root, "")
  
  values = (node, word) ->
    word += node.char
    words = []
    words.push(word) if node.word
    for child in node.children
      words = values(child, word).concat(words)
    words

exports.Trie = Trie
