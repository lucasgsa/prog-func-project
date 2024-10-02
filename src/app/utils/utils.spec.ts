import { distinct, groupBy } from './utils';

describe('Testing utils functions', () => {

    describe('distinct', () => {
        it('distinct with multiple values', () => {
            const data: { id: number, name: string}[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            // https://github.com/microsoft/TypeScript/issues/9366
            // https://github.com/microsoft/TypeScript/pull/30215
            // https://github.com/microsoft/TypeScript/pull/24626
            const result = distinct('name')(data);

            expect(result).toEqual(jasmine.arrayContaining([
                { name: 'Idk', id: 4 },
                { name: 'Alfredo', id: 3 },
                { name: 'José', id: 2 }
            ]));
        });

        it('distinct with empty list', () => {
            const data: any[] = [];
            const result = distinct('name')(data);
            expect(result).toEqual([]);
        });

        it('distinct with list with just one value', () => {
            const data = ["1"];
            const result = distinct('toString')(data);
            expect(result).toEqual(["1"]);
        });

    });

    describe('groupBy', () => {
        it('groupBy with multiple values', () => {
            type User = {
                name: string,
                id: number
            };

            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            // https://github.com/microsoft/TypeScript/issues/9366
            // https://github.com/microsoft/TypeScript/pull/30215
            // https://github.com/microsoft/TypeScript/pull/24626
            const result = groupBy('name')(data);

            expect(result).toEqual({
                "Alfredo": jasmine.arrayContaining([{ "name": "Alfredo", "id": 1 }, { "name": "Alfredo", "id": 3 }]),
                "Idk" : jasmine.arrayContaining([{ name: "Idk", id: 4 }]),
                "José": jasmine.arrayContaining([{ name: "José", id: 2 }])
            });
        });

        it('groupBy with empty list', () => {
            const data: any[] = [];
            const result = groupBy('name')(data);
            expect(result).toEqual({});
        });

        it('groupBy with list with just one value', () => {
            const data = [{ id: 1 }];
            const result = groupBy('id')(data);
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