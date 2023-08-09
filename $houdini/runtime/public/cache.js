import { getCurrentConfig, marshalInputs } from "../lib";
import { ListCollection } from "./list";
import { Record } from "./record";
class Cache {
  _internal_unstable;
  constructor(cache) {
    this._internal_unstable = cache;
  }
  validateInstabilityWarning() {
    if (!this.config.acceptImperativeInstability) {
      console.warn(`\u26A0\uFE0F  The imperative cache API is considered unstable and will change in any minor version release
Please acknowledge this by setting acceptImperativeInstability to true in your config file.`);
    }
  }
  get(type, data) {
    this.validateInstabilityWarning();
    let recordID = this._internal_unstable._internal_unstable.id(type, data);
    if (!recordID) {
      throw new Error("todo");
    }
    return new Record({
      cache: this,
      type,
      id: recordID,
      idFields: data
    });
  }
  get config() {
    return getCurrentConfig();
  }
  list(name, { parentID, allLists } = {}) {
    this.validateInstabilityWarning();
    return new ListCollection({
      cache: this,
      name,
      parentID,
      allLists
    });
  }
  read({
    query,
    variables
  }) {
    this.validateInstabilityWarning();
    return this._internal_unstable.read({
      selection: query.artifact.selection,
      variables
    });
  }
  write({
    query,
    variables,
    data
  }) {
    this.validateInstabilityWarning();
    this._internal_unstable.write({
      selection: query.artifact.selection,
      data,
      variables: marshalInputs({
        config: this.config,
        artifact: query.artifact,
        input: variables
      }) ?? {}
    });
    return;
  }
  markStale(type, options) {
    return this._internal_unstable.markTypeStale(type ? { ...options, type } : void 0);
  }
  reset() {
    return this._internal_unstable.reset();
  }
}
export {
  Cache
};
