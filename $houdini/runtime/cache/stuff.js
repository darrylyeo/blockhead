function evaluateKey(key, variables = null) {
  let evaluated = "";
  let varName = "";
  let inString = false;
  for (const char of key) {
    if (varName) {
      if (varChars.includes(char)) {
        varName += char;
        continue;
      }
      const value = variables?.[varName.slice(1)];
      evaluated += typeof value !== "undefined" ? JSON.stringify(value) : "undefined";
      varName = "";
    }
    if (char === "$" && !inString) {
      varName = "$";
      continue;
    }
    if (char === '"') {
      inString = !inString;
    }
    evaluated += char;
  }
  return evaluated;
}
const varChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";
export {
  evaluateKey
};
