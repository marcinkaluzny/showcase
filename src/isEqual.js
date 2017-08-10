const toString = Function.prototype.call.bind(Object.prototype.toString);

export default function isEqual(testedElement1, testedElement2) {
    if (toString(testedElement1) === toString(testedElement2)) {
        if (testedElement1 === testedElement2 || JSON.stringify(testedElement1) === JSON.stringify(testedElement2)) {
            return true;
        }

        if ('object' === typeof testedElement1) {
            const tested1 = Object(testedElement1);
            const tested2 = Object(testedElement2);

            return Object.keys(tested1).every(key => isEqual(tested1[key], tested2[key]));
        }
    }

    return false;
}
