import cache from "../../cache";
import { marshalSelection } from "../../lib/scalars";
import { ArtifactKind } from "../../lib/types";
import { documentPlugin } from "../utils";
const mutation = documentPlugin(ArtifactKind.Mutation, () => {
  return {
    async start(ctx, { next, marshalVariables }) {
      const layerOptimistic = cache._internal_unstable.storage.createLayer(true);
      const optimisticResponse = ctx.stuff.optimisticResponse;
      let toNotify = [];
      if (optimisticResponse) {
        toNotify = cache.write({
          selection: ctx.artifact.selection,
          data: await marshalSelection({
            selection: ctx.artifact.selection,
            data: optimisticResponse
          }),
          variables: marshalVariables(ctx),
          layer: layerOptimistic.id
        });
      }
      ctx.cacheParams = {
        ...ctx.cacheParams,
        layer: layerOptimistic,
        notifySubscribers: toNotify,
        forceNotify: true
      };
      next(ctx);
    },
    afterNetwork(ctx, { resolve }) {
      if (ctx.cacheParams?.layer) {
        cache.clearLayer(ctx.cacheParams.layer.id);
      }
      resolve(ctx);
    },
    end(ctx, { resolve, value }) {
      const hasErrors = value.errors && value.errors.length > 0;
      if (hasErrors) {
        if (ctx.cacheParams?.layer) {
          cache.clearLayer(ctx.cacheParams.layer.id);
        }
      }
      if (ctx.cacheParams?.layer) {
        cache._internal_unstable.storage.resolveLayer(ctx.cacheParams.layer.id);
      }
      resolve(ctx);
    },
    catch(ctx, { error }) {
      if (ctx.cacheParams?.layer) {
        const { layer } = ctx.cacheParams;
        cache.clearLayer(layer.id);
        cache._internal_unstable.storage.resolveLayer(layer.id);
      }
      throw error;
    }
  };
});
export {
  mutation
};
