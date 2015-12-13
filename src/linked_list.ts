export class LinkedList<T> {
    size: number = 0;
    private head: Node<T>;

    add(value: T) {
        let node = new Node<T>(value);
        if (this.isEmpty()) {
            this.head = node
        } else {
            var n: Node<T> = this.head;
            for(;n.next;) {
                n = n.next;
            }
            n.next = node;
        }
        this.size++;
    }

    isEmpty(): boolean {
        return this.size == 0;
    }

    get(index: number): T {
        this.assertIndexInBounds(index);
        let node: Node<T> = this.head;
        for(let i = 0; i < this.size; i++) {
            if (index == i) {
                return node.value;
            }
            node = node.next;
        }
    }

    private assertIndexInBounds(index: number) {
        if ((index > this.size - 1) || index < 0) {
            throw new Error(`Index ${index} out of bounds`);
        }
    }

    remove(index: number) {
        this.assertIndexInBounds(index);
        if (index == 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let previous: Node<T> = this.head;
        for(let i = 1; previous.next; i++) {
            let current = previous.next;
            if (index == i) {
                previous.next = current.next;
                this.size--;
                return;
            }
            previous = current;
        }
    }

    each(fn: (value: T, index: number) => void) {
        let node: Node<T> = this.head;
        for(let i = 0; i < this.size; i++) {
            fn(node.value, i);
            node = node.next;
        }
    }
}

class Node<T> {
    public next: Node<T>;

    constructor(public value: T) {}
}
