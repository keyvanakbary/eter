export class Queue<T> {

    private size: number = 0;
    private first: Node<T>;
    private last: Node<T>;

    enqueue(value: T): void {
        if (this.isEmpty()) {
            this.first = this.last = new Node<T>(value);
        } else {
            let node = new Node<T>(value);
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

    each(fn: (value: T) => void) {
        for(let node = this.first; node;) {
            fn(node.value);
            node = node.next;
        }
    }
}

class Node<T> {
    public next: Node<T>;
    constructor(public value: T) {}
}
