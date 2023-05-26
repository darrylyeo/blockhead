import { initClient } from "../client";
import { BaseStore } from "./base";
import { fetchParams } from "./query";
class MutationStore extends BaseStore {
  kind = "HoudiniMutation";
  async mutate(variables, {
    metadata,
    fetch,
    event,
    ...mutationConfig
  } = {}) {
    await initClient();
    const { context } = await fetchParams(this.artifact, this.artifact.name, {
      fetch,
      metadata,
      event
    });
    return await this.observer.send({
      variables,
      fetch: context.fetch,
      metadata,
      session: context.session,
      stuff: {
        ...mutationConfig
      }
    });
  }
}
export {
  MutationStore
};
