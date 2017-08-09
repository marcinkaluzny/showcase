function memoize(fn, context) {
    const cache = new Map();

    return (...args) => {
        const key = JSON.stringify(args);

        if (!cache.has(key)) {
            cache.set(key, fn.apply(context || fn, args));
        }

        return cache.get(key);
    };
}

export const fibonacci = memoize(n => {
    if (n < 2) {
        return 1;
    }

    return fibonacci(n - 2) + fibonacci(n - 1);
});

export default memoize;