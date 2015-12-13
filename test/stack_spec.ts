import { expect } from 'chai'
import { Stack } from '../src/stack'

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    it('should be empty', () => {
        expect(stack.isEmpty()).to.be.true;
    });

    describe('push', () => {
        it('should insert values', () => {
            stack.push(1);

            expect(stack.pop()).to.equal(1);
        });
    });

    describe('pop', () => {
        it('should throw exception on empty', () => {
            expect(() => stack.pop()).to.throw('Empty stack');
        });

        it('should extract the head', () => {
            stack.push(1);

            let n: number = stack.pop();

            expect(n).to.be.equal(1);
            expect(stack.isEmpty()).to.be.true;
        });

        it('should extract values in reverse order', () => {
            stack.push(1);
            stack.push(2);

            expect(stack.pop()).to.equal(2);
            expect(stack.pop()).to.equal(1);
        });
    });

    describe('each', () => {
        it('should came in reverse order', () => {
            stack.push(1);
            stack.push(2);

            let values:number[] = [];
            stack.each(value => values.push(value));

            expect(values).to.be.deep.equal([2, 1]);
        });
    });
});
