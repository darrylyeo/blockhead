export function extractPageInfo(data, path) {
    let localPath = [...path];
    // walk down the object until we get to the end
    let current = data;
    while (localPath.length > 0) {
        current = current[localPath.shift()];
    }
    return current.pageInfo;
}
