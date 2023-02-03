import cache from "../cache";
import * as log from "./log";
import { extractFiles } from "./networkUtils";
import {
  CachePolicy,
  DataSource
} from "./types";
class HoudiniClient {
  fetchFn;
  socket;
  constructor(requestHandler, subscriptionHandler) {
    this.fetchFn = requestHandler;
    this.socket = subscriptionHandler;
  }
  handleMultipart(params, args) {
    const { clone, files } = extractFiles({
      query: params.text,
      variables: params.variables
    });
    if (files.size) {
      const [url, req] = args;
      let headers = {};
      if (req?.headers) {
        const filtered = Object.entries(req?.headers).filter(([key, value]) => {
          return !(key.toLowerCase() == "content-type" && value.toLowerCase() == "application/json");
        });
        headers = Object.fromEntries(filtered);
      }
      const form = new FormData();
      const operationJSON = JSON.stringify(clone);
      form.set("operations", operationJSON);
      const map = {};
      let i = 0;
      files.forEach((paths) => {
        map[++i] = paths;
      });
      form.set("map", JSON.stringify(map));
      i = 0;
      files.forEach((paths, file) => {
        form.set(`${++i}`, file, file.name);
      });
      return [url, { ...req, headers, body: form }];
    }
  }
  async sendRequest(ctx, params) {
    let url = "";
    const result = await this.fetchFn({
      fetch: async (...args) => {
        const newArgs = this.handleMultipart(params, args);
        const response = await ctx.fetch(...newArgs || args);
        if (response.url) {
          url = response.url;
        }
        return response;
      },
      ...params,
      metadata: ctx.metadata,
      session: ctx.session || {}
    });
    return {
      body: result,
      ssr: !url
    };
  }
}
class Environment extends HoudiniClient {
  constructor(...args) {
    super(...args);
    log.info(
      `${log.red("\u26A0\uFE0F  Environment has been renamed to HoudiniClient. \u26A0\uFE0F")}
You should update your client to look something like the following:

import { HoudiniClient } from '$houdini/runtime'

export default new HoudiniClient(fetchQuery)
`
    );
  }
}
async function executeQuery({
  client,
  artifact,
  variables,
  session,
  setFetching,
  cached,
  fetch,
  metadata
}) {
  const { result: res, partial } = await fetchQuery({
    client,
    context: {
      fetch: fetch ?? globalThis.fetch.bind(globalThis),
      metadata,
      session
    },
    artifact,
    setFetching,
    variables,
    cached
  });
  if (res.errors && res.errors.length > 0) {
    throw res.errors;
  }
  if (!res.data) {
    throw new Error("Encountered empty data response in payload");
  }
  return { result: res, partial };
}
async function fetchQuery({
  client,
  context,
  artifact,
  variables,
  setFetching,
  cached = true,
  policy
}) {
  if (!client) {
    throw new Error("could not find houdini environment");
  }
  if (cached && artifact.kind === "HoudiniQuery") {
    if (!policy) {
      policy = artifact.policy;
    }
    if (policy !== CachePolicy.NetworkOnly) {
      const value = cache.read({ selection: artifact.selection, variables });
      const allowed = !value.partial || artifact.partial;
      if (value.data !== null && allowed) {
        return {
          result: {
            data: value.data,
            errors: []
          },
          source: DataSource.Cache,
          partial: value.partial
        };
      } else if (policy === CachePolicy.CacheOnly) {
        return {
          result: {
            data: null,
            errors: []
          },
          source: DataSource.Cache,
          partial: false
        };
      }
    }
  }
  setTimeout(() => {
    cache._internal_unstable.collectGarbage();
  }, 0);
  setFetching(true);
  const result = await client.sendRequest(context, {
    text: artifact.raw,
    hash: artifact.hash,
    variables
  });
  return {
    result: result.body,
    source: result.ssr ? DataSource.Ssr : DataSource.Network,
    partial: false
  };
}
export {
  Environment,
  HoudiniClient,
  executeQuery,
  fetchQuery
};
