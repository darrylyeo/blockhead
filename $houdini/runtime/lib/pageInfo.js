import { siteURL } from "./constants";
function nullPageInfo() {
  return { startCursor: null, endCursor: null, hasNextPage: false, hasPreviousPage: false };
}
function missingPageSizeError(fnName) {
  return {
    message: `${fnName} is missing the required page arguments. For more information, please visit this link: ${siteURL}/guides/pagination`
  };
}
function extractPageInfo(data, path) {
  if (!data) {
    return {
      startCursor: null,
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
  let localPath = [...path];
  let current = data;
  while (localPath.length > 0) {
    if (!current) {
      break;
    }
    current = current[localPath.shift()];
  }
  return current?.pageInfo ?? nullPageInfo();
}
function countPage(source, value) {
  let data = value;
  if (value === null || data === null || data === void 0) {
    return 0;
  }
  for (const field of source) {
    const obj = data[field];
    if (obj && !Array.isArray(obj)) {
      data = obj;
    } else if (!data) {
      throw new Error("Could not count page size");
    }
    if (Array.isArray(obj)) {
      return obj.length;
    }
  }
  return 0;
}
export {
  countPage,
  extractPageInfo,
  missingPageSizeError,
  nullPageInfo
};
