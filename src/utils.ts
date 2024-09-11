function distinct<T> (collection: T[], attribute: String): T[] {
    return [];
}

function addToMapBucket<T, K> ([x, ...xs]: Map<K, T[]>, key: K, value: T): Map<K, T[]> {
    if (x === key)
}

function groupBy<T, K extends keyof T> ([x, ...xs]: T[], attribute: K): Map<K, T[]> {
    const nextValuesGroupBy: Map<K, T[]> = groupBy(xs, attribute);
    const groupKey = x[attribute];
    nextValuesGroupBy.keys
}