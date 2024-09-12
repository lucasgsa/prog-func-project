import { distinct } from './utils';

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