import { distinct, groupBy } from '../src/utils';

describe('Testing utils functions', () => {

    describe('distinct', () => {
        test('distinct with multiple values', () => {
            const data = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result = distinct(data, 'name');

            expect(result).toEqual([
                { name: 'Idk', id: 4 },
                { name: 'Alfredo', id: 3 },
                { name: 'José', id: 2 }
              ]);
        });

        test('distinct with empty list', () => {
            const data: any[] = [];
            const result = distinct(data, 'name');
            expect(result).toEqual([]);
        });

        test('distinct with list with just one value', () => {
            const data = ["1"];
            const result = distinct(data, 'toString');
            expect(result).toEqual(["1"]);
        });

    });

    describe('groupBy', () => {
        test('groupBy with multiple values', () => {
            const data = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result = groupBy(data, 'name');

            expect(result).toEqual({
                "Alfredo": [{ "name": "Alfredo", "id": 1 }, { "name": "Alfredo", "id": 3 }],
                "Idk" : [{ name: "Idk", id: 4 }],
                "José": [{ name: "José", id: 2 }]
            });
        });

        test('groupBy with empty list', () => {
            const data: any[] = [];
            const result = groupBy(data, 'name');
            expect(result).toEqual({});
        });

        test('groupBy with list with just one value', () => {
            const data = [{ id: 1 }];
            const result = groupBy(data, 'id');
            expect(result).toEqual({ 1: [ { id: 1} ] });
        });
    });

    describe('fold', () => {
        // TODO
    });

    describe('compose', () => {
        // TODO
    });

  });