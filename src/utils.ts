export function distinct<T> (list: T[], attribute: keyof T): T[] {
    return Object.values(groupBy(list, attribute))
            .map(entry => entry[0]);
}

export function groupBy<T> (list: T[], attribute: keyof T) : { [key: string]: T[] } {
    if (list.length === 0) return {};

    const [x, ...xs] = list;
    const nextValuesGroupBy = groupBy(xs, attribute);

    const key = String(x[attribute]);
    const group = nextValuesGroupBy[key] ?? [];

    return { ...nextValuesGroupBy, [key]: [...group, x] };
}

export function fold<T,S>(foldFunc : (current : S, next : T) => S, init : S, [x, ...xs] : T[]) {
    if (xs.length == 0) return foldFunc(init, x);
    return fold(foldFunc, foldFunc(init, x), xs);
}

export function compose<Args extends unknown[], R1, R2>(func1: (arg: R2) => R1, func2: (...arg: Args) => R2) : (...arg : Args) => R1 {
    return (...args: Args) => func1(func2(...args));
}