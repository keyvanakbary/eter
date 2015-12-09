export class Queue<T> {

    private size: number = 0;
    private first: Node<T>;
    private last: Node<T>;

    enqueue(value: T): void {
        if (this.isEmpty()) {
            this.first = this.last = new Node<T>(value, null);
        } else {
            let node = new Node<T>(value, this.last);
            this.last.next = node;
            this.last = node;
        }
        this.size++;
    }

    dequeue(): T {
        if(this.isEmpty()) {
            throw new Error('Empty queue')
        }
        let value = this.first.value;
        this.first = this.first.next;
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
        public next: Node<T>
    ) {}
}
