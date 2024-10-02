export function findFirst<T> ([x]: T[]) {
    return x;
}

export function map<T, U> (mapFunc : ((arg : T) => U )) : (list: T[]) => U[] {
    return (list) => list.map(mapFunc);
}

export function distinct<T> (attribute: keyof T) : (list: T[]) => T[] {
    return compose(map(findFirst<T>), compose(Object.values, groupBy(attribute)));
}

export function groupBy <T> (attribute: keyof T) : (list: T[]) => { [key: string]: T[] } {
    return (list: T[]) => {
        if (list.length === 0) return {};

        const [x, ...xs] : T[] = list;
        const nextValuesGroupBy = groupBy<T>(attribute)(xs);

        const key = String(x[attribute]);
        const group : T[] = nextValuesGroupBy[key] ?? [];

        return { ...nextValuesGroupBy, [key]: [...group, x] };
    };
}

export function filter<T> (filterFunc : ((arg : T) => boolean )) : (list: T[]) => T[] {
    return fold ((acc : T[], value: T) => filterFunc(value) ? [value, ...acc] : acc) ([]);
}

export function fold<T,S>(foldFunc : (accumulator : S, next : T) => S) : (init : S) => (list: T[]) => S {
    return (init) => (list) => {
        if (list == null || list.length === 0) return init; 
        const [x, ...xs] = list;
        return fold (foldFunc) (foldFunc(init, x)) (xs);
    };
}

export function compose<U, V, Y>(g: (y: Y) => U, h: (z: V) => Y): (x: V) => U {
    return (x: V) => g(h(x));
}

export function orderBy<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return (list) => list.sort((b1, b2) => b1[attribute] > b2[attribute] ? 1 : -1);
}