export class BinaryTree<T> {
    private root: Node<T>;

    insert(key: number, value: T) {
        this.root = this.insertAt(key, value, this.root);
    }

    private insertAt(key: number, value: T, node: Node<T>): Node<T> {
        if (!node) {
            return new Node<T>(key, value);
        }
        if (key == node.key) {
            node.value = value;
            return node;
        }
        if (key > node.key) {
            node.right = this.insertAt(key, value, node.right);
        } else {
            node.left = this.insertAt(key, value, node.left)
        }
        return node;
    }

    get(key: number): T {
        for(let node = this.root; node;) {
            if (key == node.key) {
                return node.value;
            } else if (key > node.key) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return null;
    }

    remove(key: number) {
        this.root = this.removeAt(key, this.root);
    }

    private removeAt(key: number, node: Node<T>): Node<T> {
        if (!node) {
            return null;
        }
        if (key == node.key) {
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                let max = this.findMax(node.left);
                node.value = max.value;
                node.key = max.key;
                node.left = this.removeAt(key, node.left);
            }
        } else if (key > node.key) {
            node.right = this.removeAt(key, node.right);
        } else {
            node.left = this.removeAt(key, node.left);
        }
        return node;
    }

    private findMax(node: Node<T>): Node<T> {
        while(node.right) {
            node = node.right;
        }
        return node;
    }

    each(fn: (value: T, key: number) => void) {
        this.eachFor(this.root, fn);
    }

    private eachFor(node: Node<T>, fn: (value: T, key: number) => void) {
        if (!node) {
            return;
        }
        fn(node.value, node.key);
        if (node.right) {
            this.eachFor(node.right, fn);
        }
        if (node.left) {
            this.eachFor(node.left, fn);
        }
    }
}

class Node<T> {
    public left: Node<T> = null;
    public right: Node<T> = null;

    constructor(public key: number, public value: T) {}
}
