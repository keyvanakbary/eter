export class Trie<T> {
    private root: Node<T> = new Node<T>('');

    insert(word: string, value: T) {
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
            node.value = value;
        } else {
            node.add(word.substr(length), value);
        }
    }

    remove(word: string) {
        let parent: Node<T>, node: Node<T> = this.root;
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
            node.value = null;
        } else {
            parent.remove(word[word.length - 1]);
        }
    }

    get(word: string): T {
        let node = this.root;
        for(let i = 0; i < word.length; i++) {
            let child = node.find(word[i]);
            if (child) {
                node = child;
            } else {
                return null;
            }
        }
        return node.value ? node.value : null;
    }

    each(fn: (word: string, value: T) => void) {
        this.eachFor(this.root, '', fn);
    }

    private eachFor(node: Node<T>, prefix: string, fn: (word: string, value: T) => void) {
        if (node.value) {
            fn(prefix + node.char, node.value);
        }
        node.children.forEach(child => {
            this.eachFor(child, prefix + node.char, fn);
        });
    }
}

class Node<T> {
    public children: Node<T>[] = [];
    public value: T;

    constructor(public char: string) {}

    find(char: string): Node<T> {
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

    add(word: string, value: T) {
        let node = new Node<T>(word.charAt(0));
        if (word.length == 1) {
            node.value = value;
        } else {
            node.add(word.substr(1), value);
        }
        this.children.push(node);
    }
}
