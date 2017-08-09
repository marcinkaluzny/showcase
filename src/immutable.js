const RX_TEST = /undefined|number|string|boolean|function/;

export function immutable(source) {
    return (function process(source) {
        if (null === source || RX_TEST.test(typeof source)) {
            return source;
        }

        const src = Object(source);

        if (Array.isArray(source)) {
            return source.reduce((newArray, item) => {
                newArray.push(process(item));
                return newArray;
            }, []);
        }

        return Object.keys(source).reduce((newObject, key) => {
            newObject[key] = process(source[key]);
            return newObject;
        }, {});
    }(source));
}

/* 
function immutable2(source) {
    return (function process(source) {
        if (null === source || RX_TEST.test(typeof source)) {
            return source;
        }

        const src = Object(source);

        if (Array.isArray(source)) {
            return source.reduce((newArray, item) => [
                ...newArray,
                process(item)
            ], []);
        }

        return Object.keys(source).reduce((newObject, key) => {
            ...newObject, 
            [key]: process(source[key])
        }, {});
    }(source));
}
*/

function immutable3(source) {
    if ("function" === typeof source) {
        return {};
    }

    return JSON.parse(JSON.stringify(Object(source)));
}

export default {
    immutable,
    immutable3
};