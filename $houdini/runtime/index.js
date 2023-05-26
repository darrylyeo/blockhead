import _cache from "./cache";
import { Cache } from "./public";
export * from "./client";
export * from "./lib";
function graphql(str) {
  if (globalThis?.process?.env?.HOUDINI_PLUGIN) {
    return str;
  }
  throw new Error(`\u26A0\uFE0F graphql template was invoked at runtime. This should never happen and usually means that your project isn't properly configured.

Please make sure you have the appropriate plugin/preprocessor enabled. For more information, visit this link: https://houdinigraphql.com/guides/setting-up-your-project
`);
}
const cache = new Cache(_cache);
function getCache() {
  return _cache;
}
export {
  cache,
  getCache,
  graphql
};
