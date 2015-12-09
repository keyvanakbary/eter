export class Stack<T> {
    private size: number = 0;
    private head: Node<T>;

    push(n: T): void {
        this.head = new Node<T>(n, this.head);
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
}

class Node<T> {
    constructor(
        public value: T,
        public previous: Node<T>
    ){}
}
