import { distinct } from '../src/utils';

describe('Testing utils functions', () => {

    describe('distinct', () => {
        test('case test 1', () => {
            const data = [
                {
                    "name": "Alfredo",
                    "id": 1
                },
                {
                    "name": "José",
                    "id": 2
                },
                {
                    "name": "Alfredo",
                    "id": 3
                },
                {
                    "name": "Idk",
                    "id": 4
                }
            ];

            const distinctResult = distinct(data, 'name');
            console.log(distinctResult);
        });

    });

  });