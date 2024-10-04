export function findFirst<T> ([x]: T[]) {
    return x;
}

export function map<T, U> (mapFunc : ((arg : T) => U ), list: T[]) : U[];
export function map<T, U> (mapFunc : ((arg : T) => U )) : (list: T[]) => U[];
export function map<T, U> (mapFunc : ((arg : T) => U ), list?: T[]) {
    if (list === undefined) {
        return _map(mapFunc);
    }

    return _map(mapFunc)(list);
}

function _map<T, U> (mapFunc : ((arg : T) => U )) : (list: T[]) => U[] {
    return (list) => list.map(mapFunc);
}

export function distinct<T> (attribute: keyof T) : (list: T[]) => T[];
export function distinct<T> (attribute: keyof T, list: T[]) : T[];
export function distinct<T> (attribute: keyof T, list?: T[]) {
    if (list === undefined) {
        return _distinct(attribute);
    }

    return _distinct(attribute)(list);
}

function _distinct<T> (attribute: keyof T) : (list: T[]) => T[] {
    // return compose(map(findFirst<T>), compose(Object.values, groupBy(attribute)));
    return compose3(map(findFirst<T>), Object.values, groupBy(attribute));
}

export function groupBy<T>(attribute: keyof T): (list: T[]) => { [key: string]: T[] };
export function groupBy<T>(attribute: keyof T, list: T[]): { [key: string]: T[] };
export function groupBy<T>(attribute: keyof T, list?: T[]) {
    if (list === undefined) {
        return _groupBy(attribute);
    }

    return _groupBy(attribute)(list);
}

function _groupBy <T> (attribute: keyof T) : (list: T[]) => { [key: string]: T[] } {
    return (list: T[]) => {
        if (list.length === 0) return {};

        const [x, ...xs] : T[] = list;
        const nextValuesGroupBy = _groupBy<T>(attribute)(xs);

        const key = String(x[attribute]);
        const group : T[] = nextValuesGroupBy[key] ?? [];

        return { ...nextValuesGroupBy, [key]: [x, ...group] };
    };
}

export function filter<T>(filterFunc : ((arg : T) => boolean )): (list: T[]) => T[];
export function filter<T>(filterFunc : ((arg : T) => boolean ), list: T[]): T[];
export function filter<T>(filterFunc : ((arg : T) => boolean ), list?: T[]) {
    if (list === undefined) {
        return _filter(filterFunc);
    }

    return _filter(filterFunc)(list);
}

function _filter<T> (filterFunc : ((arg : T) => boolean )) : (list: T[]) => T[] {
    return fold ((acc : T[], value: T) => filterFunc(value) ? [value, ...acc] : acc) ([]);
}

export function fold<T,S>(foldFunc : (accumulator : S, next : T) => S) : (init : S) => (list: T[]) => S;
export function fold<T,S>(foldFunc : (accumulator : S, next : T) => S, init : S) : (list: T[]) => S;
export function fold<T,S>(foldFunc : (accumulator : S, next : T) => S, init : S, list: T[]) : S;
export function fold<T,S>(foldFunc : (accumulator : S, next : T) => S, init? : S, list?: T[]) {
    if (init === undefined && list == undefined) {
        console.log(1);
        return _fold(foldFunc);
    }

    if (list != undefined && init != undefined) {
        return _fold (foldFunc) (init) (list);
    }

    if (list == undefined && init != undefined) {
        return _fold (foldFunc) (init);
    }

    throw new Error();
}

function _fold<T,S>(foldFunc : (accumulator : S, next : T) => S) : (init : S) => (list: T[]) => S {
    return (init) => (list) => {
        if (list == null || list.length === 0) return init; 
        const [x, ...xs] = list;
        return _fold (foldFunc) (foldFunc(init, x)) (xs);
    };
}

export function orderBy<T>(attribute: keyof T): (list: T[]) => T[];
export function orderBy<T>(attribute: keyof T, list: T[]): T[];
export function orderBy<T>(attribute: keyof T, list?: T[]) {
    if (list === undefined) {
        return _orderBy(attribute);
    }

    return _orderBy(attribute)(list);
}

function _orderBy<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return (list) => list.sort((b1, b2) => b1[attribute] >= b2[attribute] ? 1 : -1);
}

export function orderByDesc<T>(attribute: keyof T): (list: T[]) => T[];
export function orderByDesc<T>(attribute: keyof T, list: T[]): T[];
export function orderByDesc<T>(attribute: keyof T, list?: T[]) {
    if (list === undefined) {
        return _orderByDesc(attribute);
    }

    return _orderByDesc(attribute)(list);
}

function _orderByDesc<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return compose(reverse<T>, orderBy(attribute));
}

export function reverse<T>(list: T[]) : T[] { 
    return [...list].reverse();
}

export function compose<A, B, C> (
    func1: (b: B) => C, 
    func2: (a: A) => B
) : (a: A) => C {
    return (a: A) => func1(func2(a));
}

export function compose3<A, B, C, D>(
    func1: (c: C) => D, 
    func2: (b: B) => C, 
    func3: (a: A) => B
): (a: A) => D {
    return (a: A) => func1(func2(func3(a)));
}

export function compose4<A, B, C, D, E>(
    func1: (d: D) => E, 
    func2: (c: C) => D, 
    func3: (b: B) => C, 
    func4: (a: A) => B
): (a: A) => E {
    return (a: A) => func1(func2(func3(func4(a))));
}
