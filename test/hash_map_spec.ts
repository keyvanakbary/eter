import { expect } from 'chai'
import { HashMap } from '../src/hash_map'

describe('HashMap', () => {
    let map: HashMap<string>;

    beforeEach(() => {
        map = new HashMap<string>(11);
    });

    describe('put', () => {
        it('should put value', () => {
            map.put('key', 'value');

            expect(map.get('key')).to.be.equal('value');
        });

        it('should replace value', () => {
            map.put('key', 'value');
            map.put('key', 'new value');

            expect(map.get('key')).to.be.equal('new value');
        });
    });

    describe('contains', () => {
        it('should contain value', () => {
            map.put('key', 'value');

            expect(map.containsKey('key')).to.be.true;
        });

        it('should not contain value', () => {
            expect(map.containsKey('key')).to.be.false;
        });
    });

    describe('remove', () => {
        it('should remove value', () => {
            map.put('key', 'value');
            map.remove('key');

            expect(map.containsKey('key')).to.be.false;
        });
    });

    describe('get', () => {
        it('should return nothing when not found', () => {
            expect(map.get('key')).to.be.null;
        });
    });

    describe('each', () => {
        it('should iterate the tree', () => {
            map.put('key1', 'value1');
            map.put('key2', 'value2');
            map.put('key3', 'value3');

            expect(keyValues(map)).to.be.deep.equal([
                ['key2', 'value2'],
                ['key3', 'value3'],
                ['key1', 'value1']
            ])
        });
    });

    function keyValues(map: HashMap<string>): [string, string][] {
        let keyValues: [string, string][] = [];
        map.each((value: string, key: string) => {
            keyValues.push([key, value]);
        });

        return keyValues;
    }
});
