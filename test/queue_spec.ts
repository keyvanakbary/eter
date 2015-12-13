import { expect } from 'chai'
import { Queue } from '../src/queue'

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    it('should be empty', () => {
        expect(queue.isEmpty()).to.be.true;
    });

    describe('enqueue', () => {
        it('should insert value', () => {
            queue.enqueue(1);

            expect(queue.dequeue()).to.be.equal(1);
        });
    });

    describe('dequeue', () => {
        it('should dequeue values in order', () => {
            queue.enqueue(1);
            queue.enqueue(2);

            expect(queue.dequeue()).to.be.equal(1);
            expect(queue.dequeue()).to.be.equal(2);
        });

        it('should throw exception on empty queue', () => {
            expect(() => queue.dequeue()).to.throw('Empty queue');
        });
    });

    describe('each', () => {
        it('should came in order', () => {
            queue.enqueue(1);
            queue.enqueue(2);

            let values:number[] = [];
            queue.each(value => values.push(value));

            expect(values).to.be.deep.equal([1, 2]);
        });
    });
});
