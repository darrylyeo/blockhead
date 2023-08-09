export * from "./adapter";
export * from "./stores";
export * from "./fragments";
export * from "./session";
export * from "./types";
async function loadAll(...loads) {
  const promises = [];
  const isPromise = (val) => "then" in val && "finally" in val && "catch" in val;
  for (const entry of loads) {
    if (!isPromise(entry) && "then" in entry) {
      throw new Error("\u274C `then` is not a valid key for an object passed to loadAll");
    }
    if (isPromise(entry)) {
      promises.push(entry);
    } else {
      for (const [key, value] of Object.entries(entry)) {
        if (isPromise(value)) {
          promises.push(value);
        } else {
          throw new Error(
            `\u274C ${key} is not a valid value for an object passed to loadAll. You must pass the result of a load_Store function`
          );
        }
      }
    }
  }
  await Promise.all(promises);
  let result = {};
  for (const entry of loads) {
    if (isPromise(entry)) {
      Object.assign(result, await entry);
    } else {
      Object.assign(
        result,
        Object.fromEntries(
          await Promise.all(
            Object.entries(entry).map(async ([key, value]) => [
              key,
              Object.values(await value)[0]
            ])
          )
        )
      );
    }
  }
  return result;
}
export {
  loadAll
};
