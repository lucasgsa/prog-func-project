import { distinct, groupBy, filter, compose, fold, orderBy } from './utils';

type User = {
    name: string,
    id: number
};

describe('Testing utils functions', () => {

    describe('distinct', () => {
        it('distinct with multiple values', () => {
            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result = distinct('name', data);

            expect(result).toEqual(jasmine.arrayContaining([
                { name: 'Idk', id: 4 },
                { name: 'Alfredo', id: 3 },
                { name: 'José', id: 2 }
            ]));
        });

        it('distinct with multiple values currying', () => {
            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result = distinct ('name') (data);

            expect(result).toEqual(jasmine.arrayContaining([
                { name: 'Idk', id: 4 },
                { name: 'Alfredo', id: 3 },
                { name: 'José', id: 2 }
            ]));
        });

        it('distinct with empty list', () => {
            const data: User[] = [];
            const result = distinct('name', data);
            expect(result).toEqual([]);
        });

        it('distinct with list with just one value', () => {
            const data = ["1"];
            const result = distinct('toString', data);
            expect(result).toEqual(["1"]);
        });

    });

    describe('groupBy', () => {
        it('groupBy with multiple values', () => {
            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result = groupBy('name' as keyof User, data);

            expect(result).toEqual({
                "Alfredo": jasmine.arrayContaining([{ "name": "Alfredo", "id": 1 }, { "name": "Alfredo", "id": 3 }]),
                "Idk" : jasmine.arrayContaining([{ name: "Idk", id: 4 }]),
                "José": jasmine.arrayContaining([{ name: "José", id: 2 }])
            });
        });

        it('groupBy with multiple values currying', () => {
            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result = groupBy ('name' as keyof User) (data);

            expect(result).toEqual({
                "Alfredo": jasmine.arrayContaining([{ "name": "Alfredo", "id": 1 }, { "name": "Alfredo", "id": 3 }]),
                "Idk" : jasmine.arrayContaining([{ name: "Idk", id: 4 }]),
                "José": jasmine.arrayContaining([{ name: "José", id: 2 }])
            });
        });

        it('groupBy with empty list', () => {
            const data: any[] = [];
            const result = groupBy('name', data);
            expect(result).toEqual({});
        });

        it('groupBy with list with just one value', () => {
            const data = [{ id: 1 }];
            const result = groupBy('id', data);
            expect(result).toEqual({ 1: [ { id: 1} ] });
        });
    });

    describe('filter', () => {
        it('should filter by name', () => {
            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result: User[] = filter((user: User) => user.name === 'Alfredo', data);

            expect(result).toEqual(jasmine.arrayContaining([
                { "name": "Alfredo", "id": 1 },
                { "name": "Alfredo", "id": 3 },
            ]));
        });

        it('should filter by name currying', () => {
            const data: User[] = [
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 }
            ];

            const result: User[] = filter ((user: User) => user.name === 'Alfredo') (data);

            expect(result).toEqual(jasmine.arrayContaining([
                { "name": "Alfredo", "id": 1 },
                { "name": "Alfredo", "id": 3 },
            ]));
        });

        it('filter with empty list', () => {
            const data: User[] = [];
            const result = filter((user: User) => user.name === 'IDK', data);
            expect(result).toEqual([]);
        });
    });

    describe('fold', () => {
        it('should list all numbers in list', () => {    
            const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const sumResult: number = fold ((acc: number, value: number) => acc + value, 0, list);
            expect(sumResult).toEqual(55);
        });

        it('should list all numbers in list curring 1', () => {    
            const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const sumResult: number = fold ((acc: number, value: number) => acc + value, 0) (list);
            expect(sumResult).toEqual(55);
        });

        it('should list all numbers in list curring 2', () => {    
            const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const sumResult: number = fold ((acc: number, value: number) => acc + value) (0) (list);
            expect(sumResult).toEqual(55);
        });
    });

    describe('compose', () => {
        it('should compose sum and map functions', () => {
            const generateList = (size : number) => {
                let lista = [];

                for (let i = 0; i <= size; i++) {
                  lista.push(i);
                }

                return lista;
            }; 

            console.log('aq');
            const sum: (list: number[]) => number = fold((acc: number, value: number) => acc + value, 0);

            const somaNumerosAte = compose(sum, generateList);
            const result: number = somaNumerosAte(10);

            expect(result).toEqual(55);
        });
    });

    describe('orderBy', () => {
        it('should order by id correctly', () => {
            const data: User[] = [
                { "name": "Idk", "id": 4 },
                { "name": "Alfredo", "id": 1 },
                { "name": "Alfredo", "id": 3 },
                { "name": "José", "id": 2 },
            ];

            const result: User[] = orderBy('id' as keyof User, data);

            expect(result).toEqual([
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 },
            ]);
        });

        it('should order by id correctly currying', () => {
            const data: User[] = [
                { "name": "Idk", "id": 4 },
                { "name": "Alfredo", "id": 1 },
                { "name": "Alfredo", "id": 3 },
                { "name": "José", "id": 2 },
            ];

            const result: User[] = orderBy ('id' as keyof User) (data);

            expect(result).toEqual([
                { "name": "Alfredo", "id": 1 },
                { "name": "José", "id": 2 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 },
            ]);
        });

        it('should order by name correctly', () => {
            const data: User[] = [
                { "name": "Idk", "id": 4 },
                { "name": "Alfredo", "id": 1 },
                { "name": "Alfredo", "id": 3 },
                { "name": "José", "id": 2 },
            ];

            const result: User[] = orderBy('name' as keyof User, data);

            expect(result).toEqual([
                { "name": "Alfredo", "id": 1 },
                { "name": "Alfredo", "id": 3 },
                { "name": "Idk", "id": 4 },
                { "name": "José", "id": 2 },
            ]);
        });
    });

  });