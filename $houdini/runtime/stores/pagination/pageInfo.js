import { siteURL } from '../../lib/constants';
export function nullPageInfo() {
    return { startCursor: null, endCursor: null, hasNextPage: false, hasPreviousPage: false };
}
export function missingPageSizeError(fnName) {
    return {
        message: `${fnName} is missing the required page arguments. For more information, please visit this link: ${siteURL}/guides/pagination`,
    };
}
export function extractPageInfo(data, path) {
    var _a;
    if (!data) {
        return {
            startCursor: null,
            endCursor: null,
            hasNextPage: false,
            hasPreviousPage: false,
        };
    }
    let localPath = [...path];
    // walk down the object until we get to the end
    let current = data;
    while (localPath.length > 0) {
        if (!current) {
            break;
        }
        current = current[localPath.shift()];
    }
    return (_a = current === null || current === void 0 ? void 0 : current.pageInfo) !== null && _a !== void 0 ? _a : nullPageInfo();
}
export function countPage(source, value) {
    let data = value;
    if (value === null || data === null || data === undefined) {
        return 0;
    }
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
