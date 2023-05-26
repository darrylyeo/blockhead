const computeKey = ({ field, args }) => {
  const keys = Object.keys(args ?? {});
  keys.sort();
  return args && keys.length > 0 ? `${field}(${keys.map((key) => `${key}: ${stringifyObjectWithNoQuotesOnKeys(args[key])}`).join(", ")})` : field;
};
const stringifyObjectWithNoQuotesOnKeys = (obj_from_json) => {
  if (Array.isArray(obj_from_json)) {
    return `[${obj_from_json.map((obj) => `${stringifyObjectWithNoQuotesOnKeys(obj)}`).join(", ")}]`;
  }
  if (typeof obj_from_json !== "object" || obj_from_json instanceof Date || obj_from_json === null) {
    return JSON.stringify(obj_from_json).replace(/"([^"]+)":/g, "$1: ");
  }
  return `{${Object.keys(obj_from_json).map((key) => `${key}: ${stringifyObjectWithNoQuotesOnKeys(obj_from_json[key])}`).join(", ")}}`;
};
export {
  computeKey
};
