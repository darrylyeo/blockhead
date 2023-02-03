import { rootID } from "../cache/cache";
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
  setFieldType(...args) {
    this.validateInstabilityWarning();
    this._internal_unstable._internal_unstable.schema.setFieldType(...args);
  }
  get root() {
    this.validateInstabilityWarning();
    return new Record({
      cache: this,
      type: "Query",
      id: rootID,
      idFields: {}
    });
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
    return this._internal_unstable._internal_unstable.config;
  }
  list(name, { parentID, allLists } = {}) {
    return new ListCollection({
      cache: this,
      name,
      parentID,
      allLists
    });
  }
}
function _typeInfo(cache, type, field) {
  if (field === "__typename") {
    return {
      type: "String",
      nullable: false,
      link: false
    };
  }
  const info = cache._internal_unstable._internal_unstable.schema.fieldType(type, field);
  if (!info) {
    throw new Error(
      `Unknown field: ${field} for type ${type}. Please provide type information using setFieldType().`
    );
  }
  return info;
}
export {
  Cache,
  _typeInfo
};
