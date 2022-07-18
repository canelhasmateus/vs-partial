export class Maybe<K> {
    value: K

    map<K, V> (fn: Function<K, V>): Maybe<V> {

        if (value === undefined || value === null) {
            return this;
        }

        const newVal = fn(value)
        return Maybe.of(newVal);
    }

    orElse<K> (fallback: K): K {
        if (value === undefined || value === null) {
            return fallback;
        }
        return value;
    }

    expect<K> (message: String): K {
        if (value === undefined || value === null) {
            throw new Exception(message);
        }
        return value;
    }

    static of<K> (value: K): Maybe<K> {
        return {
            value: value
        }
    }
}