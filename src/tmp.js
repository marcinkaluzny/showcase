const arrayReduce = Function.prototype.call.bind(Array.prototype.reduce);
const arrayForEach = Function.prototype.call.bind(Array.prototype.forEach);

const RX_PATTERN = /\{\{([^:]+?)\}\}/g;
const RX_SPLIT = /[(\:|\|),]/;

function namespace(object) {
    const testedObject = Object(object);

    function setItem(namespace, value) {
        const names = namespace.split('.');
        const lastName = names.pop();
        const lastPath = names.reduce((cycleObject, key) => {
            if (!cycleObject[key]) {
                cycleObject[key] = {}
            }
            return cycleObject[key];
        }, testedObject);

        lastPath[lastName] = value;
    }

    function getItem(namespace) {
        return namespace.split(".").reduce((tested, key) => {
            if (tested && tested[key]) {
                return tested[key];
            }
        }, testedObject);
    }

    return Object.freeze({
        set: setItem,
        get: getItem
    });
}

function prepareHtml(html, vars) {
    const {get} = namespace(vars);

    return html.replace(RX_PATTERN, ($0, $1) => {
        const data = ($1 && $1.split(RX_SPLIT));
        const value = get(data[0]);

        if (value) {
            if ("function" === typeof value) {
                return value(...data.slice(1));
            }

            return value;
        }

        return $0;
    });
}

function fragment(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    return tpl.content;
}

function prepareRefs(elements) {
    const refs = {};
    const {get, set} = namespace(refs);

    return arrayReduce(elements, (object, element) => {
        const name = element.getAttribute("ref");
        const value = get(name);

        if (value) {
            if (Array.isArray(value)) {
                value.push(element);
            } else {
                const arr = [value];
                arr.push(element);
                set(name, arr);
            }
        } else {
            set(name, element);
        }

        return refs;
    }, refs);
}

function viewFactory(html, data) {
    const template = fragment(prepareHtml(html, data));
    const refs = prepareRefs(tempalte.querySelectorAll("ref"));
    const {get, set} = namespace(refs);

    function insertInto(target, where) {
        const fragment = target.ownerDocument.importNode(template, true);
        arrayForEach(fragment.children, item => target.insertAdjacentElement(where, item));
    }

    return Object.freeze({
        get,
        set,

    });
}
