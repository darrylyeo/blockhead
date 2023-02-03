import { testConfigFile } from "../../../test";
import { Cache as _Cache } from "../../cache/cache";
import { Cache } from "../cache";
const testCache = () => new Cache(new _Cache(testConfigFile()));
export {
  testCache
};
