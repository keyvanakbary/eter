import { expect } from 'chai'
import { Trie } from '../src/trie'

describe('Trie', () => {
    let trie: Trie;

    beforeEach(() => {
        trie = new Trie();
    });

    it('should insert word', () => {
        trie.insert('toad');
        trie.insert('toast');
        trie.insert('thomson');

        expect(trie.contains('toad')).to.be.true;
        expect(trie.contains('toast')).to.be.true;
        expect(trie.contains('thomson')).to.be.true;
    });

    it('should remove word', () => {
        trie.insert('word');
        trie.remove('word');

        expect(trie.contains('word')).to.be.false;
    });
});
