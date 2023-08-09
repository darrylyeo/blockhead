import { deepEquals } from "../../lib/deepEquals";
import { ArtifactKind, DataSource } from "../../lib/types";
import { documentPlugin } from "../utils";
function subscription(factory) {
  return documentPlugin(ArtifactKind.Subscription, () => {
    let clearSubscription = null;
    let check = null;
    return {
      start(ctx, { resolve, next, initialValue }) {
        if (typeof globalThis.window === "undefined") {
          resolve(ctx, initialValue);
          return;
        }
        next(ctx);
      },
      async network(ctx, { resolve, initialValue, variablesChanged, marshalVariables }) {
        const checkValue = {
          fetchParams: ctx.fetchParams ?? {},
          session: ctx.session ?? {},
          metadata: ctx.metadata ?? {}
        };
        const changed = variablesChanged(ctx);
        const sessionChange = !deepEquals(check, checkValue);
        if (!changed && !sessionChange) {
          resolve(ctx, initialValue);
          return;
        }
        check = checkValue;
        if (sessionChange) {
          await loadClient(ctx, factory);
        }
        clearSubscription?.();
        clearSubscription = client.subscribe(
          {
            operationName: ctx.name,
            query: ctx.text,
            variables: marshalVariables(ctx)
          },
          {
            next: ({ data, errors }) => {
              resolve(ctx, {
                data: data ?? null,
                errors: [...errors ?? []],
                fetching: false,
                partial: true,
                stale: false,
                source: DataSource.Network,
                variables: ctx.variables ?? {}
              });
            },
            error(data) {
              clearSubscription?.();
              resolve(ctx, {
                partial: true,
                stale: false,
                source: DataSource.Network,
                data: null,
                errors: [data],
                fetching: false,
                variables: ctx.variables ?? {}
              });
            },
            complete() {
            }
          }
        );
      },
      cleanup() {
        clearSubscription?.();
        check = null;
      }
    };
  });
}
let pendingCreate = null;
let client;
function loadClient(ctx, factory) {
  if (pendingCreate) {
    return pendingCreate;
  }
  pendingCreate = new Promise((resolve) => {
    client = factory(ctx);
    resolve();
    pendingCreate = null;
  });
  return pendingCreate;
}
export {
  subscription
};
