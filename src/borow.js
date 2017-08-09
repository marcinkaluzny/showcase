function getPrototype(object) {
    if ("function" === typeof object) {
        return object.prototype;
    }

    return object;
}

function borow(object, method, typeName = "call") {
    const prototype = getPrototype(Object(object));

    return Function.prototype.bind[typeName](prototype[method]);
}

export default borow;