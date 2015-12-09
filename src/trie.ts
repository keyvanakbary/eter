export class Trie {
    private root: Node = new Node('');

    insert(word: string) {
        let node = this.root;
        let length = 0;
        for(;length < word.length; length++) {
            let child = node.find(word[length]);
            if (child) {
                node = child;
            } else {
                break;
            }
        }
        if (length == word.length) {
            node.isWord = true;
        } else {
            node.add(word.substr(length));
        }
    }

    remove(word: string) {
        let parent: Node, node: Node = this.root;
        for(let i = 0; i < word.length; i++) {
            let child = node.find(word[i]);
            if (child) {
                parent = node;
                node = child;
            } else {
                return;
            }
        }
        if (node.hasChildren()) {
            node.isWord = false;
        } else {
            parent.remove(word[word.length - 1]);
        }
    }

    contains(word: string) {
        let node = this.root;
        for(let i = 0; i < word.length; i++) {
            let child = node.find(word[i]);
            if (child) {
                node = child;
            } else {
                return false;
            }
        }

        return node.isWord;
    }
}

class Node {
    private children: Node[] = [];
    public isWord: boolean = false;

    constructor(public char: string) {}

    find(char: string): Node {
        let found = this.children.filter(child => {
            return child.char == char;
        });
        return (found.length > 0) ? found[0] : null;
    }

    remove(char: string) {
        this.children = this.children.filter(child => {
            return child.char != char;
        });
    }

    hasChildren(): boolean {
        return this.children.length > 0;
    }

    add(word: string) {
        let node = new Node(word.charAt(0));
        if (word.length == 1) {
            node.isWord = true;
        } else {
            node.add(word.substr(1));
        }
        this.children.push(node);
    }
}
