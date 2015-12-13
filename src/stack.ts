export class Stack<T> {
    private size: number = 0;
    private head: Node<T>;

    push(value: T): void {
        this.head = new Node<T>(value, this.head);
        this.size++;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error('Empty stack')
        }
        let value = this.head.value;
        this.head = this.head.previous;
        this.size--;
        return value;
    }

    isEmpty(): boolean {
        return this.size == 0;
    }

    each(fn: (value: T) => void) {
        for(let node = this.head; node;) {
            fn(node.value);
            node = node.previous;
        }
    }
}

class Node<T> {
    constructor(
        public value: T,
        public previous: Node<T>
    ){}
}
