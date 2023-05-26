import cache from "../../cache";
import { deepEquals } from "../../lib/deepEquals";
import { ArtifactKind, DataSource } from "../../lib/types";
import { documentPlugin } from "../utils";
const fragment = documentPlugin(ArtifactKind.Fragment, function() {
  let subscriptionSpec = null;
  let lastReference = null;
  return {
    start(ctx, { next, resolve, variablesChanged, marshalVariables }) {
      if (!ctx.stuff.parentID) {
        return next(ctx);
      }
      const currentReference = {
        parent: ctx.stuff.parentID,
        variables: marshalVariables(ctx)
      };
      if (!ctx.cacheParams?.disableSubscriptions && (!deepEquals(lastReference, currentReference) || variablesChanged(ctx))) {
        if (subscriptionSpec) {
          cache.unsubscribe(subscriptionSpec, subscriptionSpec.variables?.() || {});
        }
        const variables = marshalVariables(ctx);
        subscriptionSpec = {
          rootType: ctx.artifact.rootType,
          selection: ctx.artifact.selection,
          variables: () => variables,
          parentID: ctx.stuff.parentID,
          set: (newValue) => {
            resolve(ctx, {
              data: newValue,
              errors: null,
              fetching: false,
              partial: false,
              stale: false,
              source: DataSource.Cache,
              variables
            });
          }
        };
        cache.subscribe(subscriptionSpec, variables);
        lastReference = currentReference;
      }
      next(ctx);
    },
    cleanup() {
      if (subscriptionSpec) {
        cache.unsubscribe(subscriptionSpec, subscriptionSpec.variables?.());
      }
    }
  };
});
export {
  fragment
};
