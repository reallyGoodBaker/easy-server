function isSubset(dest: Iterable<any>, src: Iterable<any>) {
    const source = new Set(src)
    const size = source.size

    for (const item of dest) source.add(item)

    return source.size === size
}