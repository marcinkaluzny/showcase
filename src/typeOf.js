function typeOf(element) {
    const type = Object.prototype.toString.call(element);
    const match = /\[.*\s(.*)\]/ig.exec(type);

    if (match && match[1]) {
        type = match[1];
    }

    return type.toLowerCase();
}

export default typeOf;