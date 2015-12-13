import { expect } from 'chai'
import { BinaryTree } from '../src/binary_tree';

describe('BinaryTree', () => {
    let tree: BinaryTree<string>;

    beforeEach(() => {
        tree = new BinaryTree<string>();
    });

    describe('insert', () => {
        it('should insert value', () => {
            tree.insert(1, 'one');
            tree.insert(2, 'two');
            tree.insert(3, 'three');

            expect(tree.get(1)).to.be.equal('one');
            expect(tree.get(2)).to.be.equal('two');
            expect(tree.get(3)).to.be.equal('three');
        });
    });

    describe('remove', () => {
        it('should remove value', () => {
            tree.insert(1, 'one');
            tree.remove(1);

            expect(tree.get(1)).to.be.null;
        });

        it('should do nothing on non existing index', () => {
            tree.remove(1);
        });

        it('should rearrange structure', () => {
            tree.insert(5, 'five');
            tree.insert(4, 'four');
            tree.insert(10, 'ten');
            tree.insert(6, 'six');
            tree.insert(15, 'fifteen');

            tree.remove(10);

            expect(tree.get(10)).to.be.null;
        });
    });
});
