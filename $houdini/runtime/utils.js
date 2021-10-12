export function extractPageInfo(data, path) {
    let localPath = [...path];
    // walk down the object until we get to the end
    let current = data;
    while (localPath.length > 0) {
        current = current[localPath.shift()];
    }
    return current.pageInfo;
}
export function countPage(source, value) {
    let data = value;
    for (const field of source) {
        const obj = data[field];
        if (obj && !Array.isArray(obj)) {
            data = obj;
        }
        else if (!data) {
            throw new Error('Could not count page size');
        }
        if (Array.isArray(obj)) {
            return obj.length;
        }
    }
    return 0;
}
