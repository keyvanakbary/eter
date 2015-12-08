import { expect } from 'chai'
import { HashMap } from '../src/hash_map'
import { LinkedList } from "../src/linked_list";

describe('LinkedList', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    describe('add', () => {
        it('should insert an element', () => {
            list.add(1);

            expect(list.get(0)).to.be.equal(1);
        });

        it('should insert elements in order', () => {
            list.add(1);
            list.add(2);
            list.add(3);

            expect(list.get(0)).to.be.equal(1);
            expect(list.get(1)).to.be.equal(2);
            expect(list.get(2)).to.be.equal(3);
        });
    });

    describe('remove', () => {
        it('should remove element', () => {
            list.add(1);
            list.add(2);
            list.add(3);
            list.remove(1);

            expect(list.get(0)).to.be.equal(1);
            expect(list.get(1)).to.be.equal(3);
            expect(list.size).to.be.equal(2);
        });

        it('should remove first element', () => {
            list.add(1);
            list.remove(0);

            expect(list.size).to.be.equal(0);
        });

        it('should remove last element', () => {
            list.add(1);
            list.add(2);
            list.remove(1);

            expect(list.size).to.be.equal(1);
        });
    })
});
