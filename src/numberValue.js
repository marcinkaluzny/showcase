function numberValue(value, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
    const val = Number(value);

    if (!String(value).trim() || Number.isNaN(val)) {
        return '';
    }

    return Math.min(max, Math.max(min, val));
}

export default numberValue;
