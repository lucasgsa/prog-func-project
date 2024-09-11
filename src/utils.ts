// function distinct<T> ([x, ...xs]: T[], attribute: keyof T): T[] {
//     if (xs.length === 0) {
//         return [x];
//     }

//     return xs.includes(x) ? distinct(xs, attribute) : [x, ...distinct(xs, attribute)];
// }

// function groupBy<T> ([x, ...xs]: T[], attribute: keyof T) : Map<String, T[]> {
//     const nextValuesGroupBy: Map<String, T[]> = groupBy(xs, attribute);
//     const chave = x[attribute];
//     const keyGroup = nextValuesGroupBy[x[attribute]] ?? [];

//     const sameGroupOfX = nextValuesGroupBy[attribute]
//     const groupKey = x[attribute];
//     nextValuesGroupBy.keys
//     return {};
// }

function fold<T,S>(foldFunc : (current : S, next : T) => S, init : S, [x, ...xs] : T[]) {
    if (xs.length == 0) {
        return foldFunc(init, x);
    }

    return fold(foldFunc, foldFunc(init, x), xs);
}

function compose<Args, R1, R2>(func1: (arg: R2) => R1, func2: (...arg: Args[]) => R2) : (...arg : Args[]) => R1 {
    return (...args: Args[]) => func1(func2(...args));
}

const main = () => {
    const componseFunc = compose(console.log, (...numbers : number[]) => fold((a : number, b : number) => a+b, 0, numbers));
    componseFunc(1, 2, 3, 4, 5);
}

main();