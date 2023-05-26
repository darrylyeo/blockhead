import { getCurrentConfig } from "$houdini/runtime/lib/config";
import * as log from "$houdini/runtime/lib/log";
import { ArtifactKind, CachePolicy, CompiledQueryKind } from "$houdini/runtime/lib/types";
import { get } from "svelte/store";
import { clientStarted, isBrowser } from "../adapter";
import { initClient } from "../client";
import { getSession } from "../session";
import { BaseStore } from "./base";
class QueryStore extends BaseStore {
  variables;
  kind = CompiledQueryKind;
  loadPending = false;
  storeName;
  constructor({ artifact, storeName, variables }) {
    const fetching = artifact.pluginData["houdini-svelte"]?.isManualLoad !== true;
    super({
      artifact,
      fetching,
      initialize: !artifact.pluginData["houdini-svelte"].isManualLoad
    });
    this.storeName = storeName;
    this.variables = variables;
  }
  async fetch(args) {
    const client = await initClient();
    this.setup(false);
    const { policy, params, context } = await fetchParams(this.artifact, this.storeName, args);
    if (!isBrowser && !(params && "fetch" in params) && (!params || !("event" in params))) {
      log.error(contextError(this.storeName));
      throw new Error("Error, check above logs for help.");
    }
    const isLoadFetch = Boolean("event" in params && params.event);
    const isComponentFetch = !isLoadFetch;
    if (this.loadPending && isComponentFetch) {
      log.error(`\u26A0\uFE0F Encountered fetch from your component while ${this.storeName}.load was running.
This will result in duplicate queries. If you are trying to ensure there is always a good value, please a CachePolicy instead.`);
      return get(this.observer);
    }
    if (isComponentFetch) {
      params.blocking = true;
    }
    const config = getCurrentConfig();
    const config_svelte = config.plugins["houdini-svelte"];
    const pluginArtifact = this.artifact.pluginData["houdini-svelte"];
    let need_to_block = false;
    if (client.throwOnError_operations.includes("all") || client.throwOnError_operations.includes("query")) {
      if (config_svelte.defaultRouteBlocking === false) {
        log.info(
          '[Houdini] \u26A0\uFE0F throwOnError with operation "all" or "query", is not compatible with defaultRouteBlocking set to "false"'
        );
      }
    }
    if (config_svelte.defaultRouteBlocking === true) {
      need_to_block = true;
    }
    if (client.throwOnError_operations.includes("all") || client.throwOnError_operations.includes("query")) {
      need_to_block = true;
    }
    if (pluginArtifact?.set_blocking === true) {
      need_to_block = true;
    } else if (pluginArtifact?.set_blocking === false) {
      need_to_block = false;
    }
    if (params?.blocking === true) {
      need_to_block = true;
    } else if (params?.blocking === false) {
      need_to_block = false;
    }
    if (isLoadFetch) {
      this.loadPending = true;
    }
    if (isBrowser && this.artifact.enableLoadingState) {
      need_to_block = false;
    }
    const fakeAwait = clientStarted && isBrowser && !need_to_block;
    if (policy !== CachePolicy.NetworkOnly && fakeAwait) {
      await this.observer.send({
        fetch: context.fetch,
        variables: params.variables,
        metadata: params.metadata,
        session: context.session,
        policy: CachePolicy.CacheOnly,
        silenceEcho: true
      });
    }
    const request = this.observer.send({
      fetch: context.fetch,
      variables: params.variables,
      metadata: params.metadata,
      session: context.session,
      policy,
      stuff: {}
    });
    request.then((val) => {
      this.loadPending = false;
      params.then?.(val.data);
    }).catch(() => {
    });
    if (!fakeAwait) {
      await request;
    }
    return get(this.observer);
  }
}
async function fetchParams(artifact, storeName, params) {
  let policy = params?.policy;
  if (!policy && artifact.kind === ArtifactKind.Query) {
    policy = artifact.policy ?? CachePolicy.CacheOrNetwork;
  }
  let fetchFn = null;
  if (params) {
    if ("fetch" in params && params.fetch) {
      fetchFn = params.fetch;
    } else if ("event" in params && params.event && "fetch" in params.event) {
      fetchFn = params.event.fetch;
    }
  }
  if (!fetchFn) {
    fetchFn = globalThis.fetch.bind(globalThis);
  }
  let session = void 0;
  if (params && "event" in params && params.event) {
    session = await getSession(params.event);
  } else if (isBrowser) {
    session = await getSession();
  } else {
    log.error(contextError(storeName));
    throw new Error("Error, check above logs for help.");
  }
  return {
    context: {
      fetch: fetchFn,
      metadata: params?.metadata ?? {},
      session
    },
    policy,
    params: params ?? {}
  };
}
const contextError = (storeName) => `
	${log.red(`Missing event args in load function`)}.

Please remember to pass event to fetch like so:

import type { LoadEvent } from '@sveltejs/kit';

// in a load function...
export async function load(${log.yellow("event")}: LoadEvent) {
	return {
		...load_${storeName}({ ${log.yellow("event")}, variables: { ... } })
	};
}

// in a server-side mutation:
await mutation.mutate({ ... }, ${log.yellow("{ event }")})
`;
export {
  QueryStore,
  fetchParams
};
