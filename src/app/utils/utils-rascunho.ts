export function orderBy<T>(attribute: keyof T): (list: T[]) => T[];
export function orderBy<T>(attribute: keyof T, list: T[]): T[];
export function orderBy<T>(attribute: keyof T, list?: T[]) {
    if (list === undefined) {
        return orderByCurry(attribute);
    }

    return orderByCurry(attribute)(list);
}

function orderByCurry<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return (list) => list.sort((b1, b2) => b1[attribute] >= b2[attribute] ? 1 : -1);
}

export function orderByDesc<T>(attribute: keyof T): (list: T[]) => T[];
export function orderByDesc<T>(attribute: keyof T, list: T[]): T[];
export function orderByDesc<T>(attribute: keyof T, list?: T[]) {
    if (list === undefined) {
        return orderByDescCurry(attribute);
    }

    return orderByDescCurry(attribute)(list);
}

function orderByDescCurry<T>(attribute: keyof T) : (list: T[]) => T[] { 
    return compose(reverse<T>, orderBy(attribute));
}