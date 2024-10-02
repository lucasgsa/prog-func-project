export function findFirst<T> ([x]: T[]) {
    return x;
}

export function map<T, U> (mapFunc : ((arg : T) => U )) : (list: T[]) => U[] {
    return (list) => list.map(mapFunc);
}

export function distinct<T> (attribute: keyof T) : (list: T[]) => T[] {
    // return pipe(groupBy(attribute), Object.values, map(findFirst<T>));
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

// const fold = <T,S> (foldFunc : (accumulator : S, next : T) => S) => (init : S) => (list: T[]) : S => {
//     if (list == null || list.length === 0) return init; 
//     const [x, ...xs] = list;
//     return fold (foldFunc) (foldFunc(init, x)) (xs);
// }

export function compose<A, B, C> (func1: (b: B) => C, func2: (a: A) => B) : (a: A) => C {
    return (a: A) => func1(func2(a));
}

export function orderBy<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return (list) => list.sort((b1, b2) => b1[attribute] > b2[attribute] ? 1 : -1);
}

export function orderByDesc<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return compose(reverse<T>, orderBy(attribute));
}

export function reverse<T>(list: T[]) : T[] { 
    return [...list].reverse();
}