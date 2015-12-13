import { expect } from 'chai'
import { Trie } from '../src/trie'

describe('Trie', () => {
    let trie: Trie<string>;

    beforeEach(() => {
        trie = new Trie<string>();
    });

    it('should insert word', () => {
        trie.insert('toad', 'toad');
        trie.insert('toast', 'toast');
        trie.insert('thomson', 'thomson');

        expect(trie.get('toad')).to.be.equal('toad');
        expect(trie.get('toast')).to.be.equal('toast');
        expect(trie.get('thomson')).to.be.equal('thomson');
    });

    it('should remove word', () => {
        trie.insert('word', 'value');
        trie.remove('word');

        expect(trie.get('word')).to.be.null;
    });

    describe('each', () => {
        it('should iterate every word', () => {
            trie.insert('toad', 'toad');
            trie.insert('toast', 'toast');
            trie.insert('thomson', 'thomson');

            let values: [string, string][] = [];
            trie.each((word, value) => values.push([word, value]));

            expect(values).to.be.deep.equal([
                ['toad', 'toad'],
                ['toast', 'toast'],
                ['thomson', 'thomson']
            ]);
        });
    });
});
