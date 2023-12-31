"use strict";
function isSubset(dest, src) {
    const source = new Set(src);
    const size = source.size;
    for (const item of dest)
        source.add(item);
    return source.size === size;
}
