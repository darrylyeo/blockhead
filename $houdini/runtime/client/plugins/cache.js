import cache from "../../cache";
import { Cache } from "../../cache/cache";
import { ArtifactKind, CachePolicy, DataSource } from "../../lib/types";
const serverSide = typeof globalThis.window === "undefined";
const cachePolicy = ({
  enabled,
  setFetching,
  cache: localCache = cache,
  serverSideFallback = true
}) => () => {
  return {
    network(ctx, { initialValue, next, resolve, marshalVariables }) {
      const { policy, artifact } = ctx;
      let useCache = false;
      if (enabled && (artifact.kind === ArtifactKind.Query || artifact.kind === ArtifactKind.Fragment) && !ctx.cacheParams?.disableRead) {
        if (policy !== CachePolicy.NetworkOnly) {
          const value = localCache.read({
            selection: artifact.selection,
            variables: marshalVariables(ctx),
            fullCheck: true
          });
          const allowed = !value.partial || artifact.kind === ArtifactKind.Query && artifact.partial;
          if (policy === CachePolicy.CacheOnly) {
            return resolve(ctx, {
              fetching: false,
              variables: ctx.variables ?? null,
              data: allowed ? value.data : initialValue.data,
              errors: null,
              source: DataSource.Cache,
              partial: allowed ? value.partial : false,
              stale: value.stale
            });
          }
          useCache = !!(value.data !== null && allowed);
          if (useCache) {
            resolve(ctx, {
              fetching: false,
              variables: ctx.variables ?? null,
              data: value.data,
              errors: null,
              source: DataSource.Cache,
              partial: value.partial,
              stale: value.stale
            });
          }
          if (useCache && !value.partial && !value.stale && ctx.policy !== "CacheAndNetwork") {
            return;
          }
        }
      }
      if (enabled) {
        setTimeout(() => {
          localCache._internal_unstable.collectGarbage();
        }, 0);
      }
      if (!ctx.stuff?.silenceLoading) {
        let fetchingState = null;
        if (!useCache && "enableLoadingState" in artifact && artifact.enableLoadingState) {
          fetchingState = localCache.read({
            selection: artifact.selection,
            variables: marshalVariables(ctx),
            loading: true
          }).data;
        }
        setFetching(!useCache, fetchingState);
      }
      return next(ctx);
    },
    afterNetwork(ctx, { resolve, value, marshalVariables }) {
      if (value.source !== DataSource.Cache && enabled && value.data && !ctx.cacheParams?.disableWrite) {
        if (ctx.cacheParams && "serverSideFallback" in ctx.cacheParams) {
          serverSideFallback = ctx.cacheParams?.serverSideFallback ?? serverSideFallback;
        }
        const targetCache = serverSide && serverSideFallback ? new Cache({ disabled: false }) : localCache;
        let layer;
        if (!serverSide && ctx.cacheParams?.layer) {
          layer = ctx.cacheParams.layer.id;
        }
        targetCache.write({
          ...ctx.cacheParams,
          layer,
          selection: ctx.artifact.selection,
          data: value.data,
          variables: marshalVariables(ctx)
        });
        value = {
          ...value,
          data: targetCache.read({
            selection: ctx.artifact.selection,
            variables: marshalVariables(ctx),
            ignoreMasking: serverSide
          }).data
        };
      }
      resolve(ctx, value);
    }
  };
};
export {
  cachePolicy
};
