import { rootID } from "../cache/cache";
import { marshalInputs } from "../lib";
import { keyFieldsForType } from "../lib/config";
class Record {
  #id;
  #cache;
  type;
  idFields;
  constructor({
    cache,
    type,
    id,
    idFields
  }) {
    this.#cache = cache;
    this.#id = id;
    this.type = type;
    this.idFields = idFields;
    if (id !== rootID) {
      for (const key of keyFieldsForType(this.#cache.config, type)) {
        if (!(key in idFields)) {
          throw new Error("Missing key in idFields: " + key);
        }
      }
    }
  }
  read({
    fragment,
    variables
  }) {
    return this.#cache._internal_unstable.read({
      selection: fragment.artifact.selection,
      parent: this.#id,
      variables: marshalInputs({
        config: this.#cache.config,
        artifact: fragment.artifact,
        input: variables
      }) ?? void 0
    });
  }
  write(args) {
    this.#cache._internal_unstable.write({
      data: args.data,
      selection: args.fragment.artifact.selection,
      parent: this.#id,
      variables: marshalInputs({
        config: this.#cache.config,
        artifact: args.fragment.artifact,
        input: args.variables
      }) ?? void 0,
      forceStale: args.forceStale
    });
  }
  delete() {
    this.#cache._internal_unstable.delete(this.#id);
  }
  markStale(field, {
    when
  } = {}) {
    this.#cache._internal_unstable.markRecordStale(this.#id, { field, when });
  }
}
export {
  Record
};
