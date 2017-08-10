export function closest(element, selector) {
    if (!element) {
        return null;
    }

    if (element.closest) {
        return element.closest(selector);
    }

    const matchesSelector = element.matches || element.msMatchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector;

    if (matchesSelector.call(element, selector)) {
        return element;
    }

    return closest(element.parentElement, selector) || null;
}

export function insertAdjacentElement(target, where, element) {
    if (target.insertAdjacentElement) {
        return target.insertAdjacentElement(where, element);
    }

    switch (where) {
    case 'afterBegin':
        target.insertBefore(element, target.firstChild);
        break;
    case 'beforeBegin':
        target.parentNode.insertBefore(element, target);
        break;
    case 'afterEnd':
        target.parentNode.insertBefore(element, target.nextSibling);
        break;
    default:
        target.appendChild(element);
        break;
    }
}

export function insertAdjacentText(target, where, text) {
    if (target.insertAdjacentText) {
        return target.insertAdjacentText(where, text);
    }

    const textNode = target.ownerDocument.createTextNode(text);

    insertAdjacentElement.call(target, where, textNode);
}

export function htmlToDocument(html) {
    return (new DOMParser).parseFromString(html, "text/html");
}

export function htmlToContent(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
}

export default {
    closest,
    htmlToContent,
    htmlToDocument,
    insertAdjacentElement,
    insertAdjacentText
};
