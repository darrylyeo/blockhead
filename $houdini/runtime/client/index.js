import { flatten } from "../lib/flatten";
import { DocumentStore } from "./documentStore";
import {
  fetch as fetchPlugin,
  fetchParams as fetchParamsPlugin,
  fragment as fragmentPlugin,
  mutation as mutationPlugin,
  query as queryPlugin,
  throwOnError as throwOnErrorPlugin
} from "./plugins";
import pluginsFromPlugins from "./plugins/injectedPlugins";
import { DocumentStore as DocumentStore2 } from "./documentStore";
import { fetch, mutation, query, subscription } from "./plugins";
class HoudiniClient {
  url;
  plugins;
  throwOnError_operations;
  constructor({
    url,
    fetchParams,
    plugins,
    pipeline,
    throwOnError
  }) {
    if (plugins && pipeline) {
      throw new Error(
        "A client cannot be given a pipeline and a list of plugins at the same time."
      );
    }
    this.throwOnError_operations = throwOnError?.operations ?? [];
    this.plugins = flatten(
      [].concat(
        throwOnError ? [throwOnErrorPlugin(throwOnError)] : [],
        fetchParamsPlugin(fetchParams),
        pipeline ?? [
          queryPlugin,
          mutationPlugin,
          fragmentPlugin
        ].concat(
          plugins ?? [],
          pluginsFromPlugins,
          fetchPlugin()
        )
      )
    );
    this.url = url;
  }
  observe({
    enableCache = true,
    fetching = false,
    ...rest
  }) {
    return new DocumentStore({
      client: this,
      plugins: createPluginHooks(this.plugins),
      fetching,
      enableCache,
      ...rest
    });
  }
}
function createPluginHooks(plugins) {
  return plugins.reduce((hooks, plugin) => {
    if (typeof plugin !== "function") {
      throw new Error("Encountered client plugin that's not a function");
    }
    const result = plugin();
    if (!result) {
      return hooks;
    }
    if (!Array.isArray(result)) {
      return hooks.concat(result);
    }
    for (const value of result) {
      if (!value) {
        continue;
      }
      if (typeof value === "function") {
        return hooks.concat(createPluginHooks([value]));
      }
      hooks.push(value);
    }
    return hooks;
  }, []);
}
export {
  DocumentStore2 as DocumentStore,
  HoudiniClient,
  createPluginHooks,
  fetch,
  mutation,
  query,
  subscription
};
