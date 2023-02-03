import { getCache } from "$houdini/runtime";
import { getCurrentConfig } from "$houdini/runtime/lib/config";
class BaseStore {
  async getConfig() {
    const config = await getCurrentConfig();
    getCache().setConfig(config);
    return config;
  }
}
export {
  BaseStore
};
