import { rootID } from "./cache";
class SchemaManager {
  cache;
  fieldTypes = {};
  constructor(cache) {
    this.cache = cache;
  }
  setFieldType({
    parent,
    key,
    type,
    nullable = false,
    link
  }) {
    let parensIndex = key.indexOf("(");
    if (parensIndex !== -1) {
      key = key.substring(0, parensIndex);
    }
    if (parent === rootID) {
      parent = "Query";
    } else if (parent.includes(":")) {
      parent = parent.substring(0, parent.indexOf(":"));
    }
    if (!this.fieldTypes[parent]) {
      this.fieldTypes[parent] = {};
    }
    this.fieldTypes[parent][key] = {
      type,
      nullable,
      link: !!link
    };
  }
  fieldType(type, field) {
    return this.fieldTypes[type]?.[field] || null;
  }
  get config() {
    return this.cache._internal_unstable.config;
  }
}
export {
  SchemaManager
};
