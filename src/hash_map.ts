export class HashMap<T> {
    private table: Array<Array<Node<T>>>;

    constructor(private size: number) {
        this.table = new Array<Array<Node<T>>>(size);
        for (let i = 0; i < size; i++) {
            this.table[i] = [];
        }
    }

    put(key: string, value: T) {
        let chain = this.chainForKey(key);
        let index = this.find(key, chain);
        let node = new Node<T>(key, value);
        if (index < 0) {
            chain.push(node);
        } else {
            chain[index] = node;
        }
    }

    private chainForKey(key: string): Array<Node<T>> {
        return this.table[this.hash(key)];
    }

    private hash(key: string): number {
        let h = 0;
        for(let i = 0; i < key.length; i++) {
            h = (32 * h + key.charCodeAt(i)) % this.size;
        }
        return h;
    }

    private find(key: string, chain: Array<Node<T>>): number {
        for(let i = 0; i < chain.length; i++) {
            if (chain[i].key == key) {
                return i;
            }
        }
        return -1;
    }

    get(key: string): T {
        let chain = this.chainForKey(key);
        let index = this.find(key, chain);
        return (index < 0) ? null : chain[index].value;
    }

    remove(key: string) {
        let chain = this.chainForKey(key);
        let index = this.find(key, chain);
        if (index >= 0) {
            chain.splice(index, 1);
        }
    }

    containsKey(key: string): boolean {
        let chain = this.chainForKey(key);
        return this.find(key, chain) >= 0;
    }
}

class Node<T> {
    constructor(
        public key: string,
        public value: T
    ) {}
}
