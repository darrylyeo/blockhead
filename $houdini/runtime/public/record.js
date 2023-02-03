import { rootID } from "../cache/cache";
import { keyFieldsForType } from "../lib";
import { _typeInfo } from "./cache";
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
  set({
    field,
    args,
    value
  }) {
    this.#cache.validateInstabilityWarning();
    const key = computeKey({ field, args });
    const typeInfo = _typeInfo(this.#cache, this.type, field);
    let newValue;
    if (typeInfo.link) {
      const keys = keyFieldsForType(this.#cache.config, typeInfo.type);
      typeInfo.selection = {
        fields: keys.reduce(
          (acc, key2) => {
            const keyInfo = _typeInfo(this.#cache, typeInfo.type, key2);
            return {
              ...acc,
              [key2]: {
                type: keyInfo.type,
                keyRaw: key2
              }
            };
          },
          {
            __typename: {
              type: "String",
              keyRaw: "__typename"
            }
          }
        )
      };
    }
    if (!typeInfo.link) {
      const fnMarshal = this.#cache.config.scalars?.[typeInfo.type]?.marshal;
      if (fnMarshal) {
        newValue = fnMarshal(value);
      } else {
        newValue = value;
      }
    } else if (value instanceof Record) {
      newValue = {
        ...value.idFields,
        __typename: value.type
      };
    } else if (Array.isArray(value)) {
      newValue = marshalNestedList(value);
    } else if (value !== null) {
      throw new Error("Value must be a RecordProxy if the field is a link to another record");
    }
    this.#cache._internal_unstable._internal_unstable.lifetimes.resetLifetime(this.#id, key);
    this.#cache._internal_unstable.write({
      parent: this.#id,
      selection: {
        fields: {
          [field]: {
            keyRaw: key,
            ...typeInfo
          }
        }
      },
      data: {
        [field]: newValue
      }
    });
  }
  get({
    field,
    args
  }) {
    this.#cache.validateInstabilityWarning();
    const key = computeKey({ field, args });
    const typeInfo = _typeInfo(this.#cache, this.type, field);
    if (typeInfo.link) {
      const keys = keyFieldsForType(this.#cache.config, typeInfo.type);
      typeInfo.selection = {
        fields: keys.reduce(
          (acc, key2) => {
            const keyInfo = _typeInfo(this.#cache, typeInfo.type, key2);
            return {
              ...acc,
              [key2]: {
                type: keyInfo.type,
                keyRaw: key2
              }
            };
          },
          {
            __typename: {
              type: "String",
              keyRaw: "__typename"
            }
          }
        )
      };
    }
    const result = this.#cache._internal_unstable.read({
      parent: this.#id,
      selection: {
        fields: {
          [field]: {
            keyRaw: key,
            ...typeInfo
          }
        }
      }
    });
    if (!typeInfo.link) {
      return result.data?.[field] ?? (typeInfo.nullable ? null : void 0);
    }
    const data = result.data?.[field] || {};
    let finalResult = unmarshalNestedList(
      this.#cache,
      !Array.isArray(data) ? [data] : data
    ).map((val) => {
      if (typeInfo.nullable && (val === null || Object.keys(val).length === 0)) {
        return null;
      }
      return val;
    });
    return Array.isArray(data) ? finalResult : finalResult[0];
  }
  delete() {
    this.#cache._internal_unstable.delete(this.#id);
  }
}
function computeKey({ field, args }) {
  const keys = Object.keys(args ?? {});
  keys.sort();
  return args && keys.length > 0 ? `${field}(${keys.map((key) => `${key}: ${stringifyObjectWithNoQuotesOnKeys(args[key])}`).join(", ")})` : field;
}
const stringifyObjectWithNoQuotesOnKeys = (obj_from_json) => {
  if (Array.isArray(obj_from_json)) {
    return `[${obj_from_json.map((obj) => `${stringifyObjectWithNoQuotesOnKeys(obj)}`).join(", ")}]`;
  }
  if (typeof obj_from_json !== "object" || obj_from_json instanceof Date || obj_from_json === null) {
    return JSON.stringify(obj_from_json).replace(/"([^"]+)":/g, "$1: ");
  }
  return `{${Object.keys(obj_from_json).map((key) => `${key}: ${stringifyObjectWithNoQuotesOnKeys(obj_from_json[key])}`).join(", ")}}`;
};
function marshalNestedList(list) {
  const newValue = [];
  for (const inner of list) {
    if (Array.isArray(inner)) {
      newValue.push(marshalNestedList(inner));
    } else if (inner instanceof Record) {
      newValue.push({ ...inner.idFields, __typename: inner.type });
    } else {
      newValue.push(inner);
    }
  }
  return newValue;
}
function unmarshalNestedList(cache, list) {
  const newValue = [];
  for (const inner of list) {
    if (Array.isArray(inner)) {
      newValue.push(unmarshalNestedList(cache, inner));
    } else if (inner === null) {
      newValue.push(null);
    } else if (inner.__typename) {
      const type = inner.__typename;
      let recordID = cache._internal_unstable._internal_unstable.id(type, inner);
      if (!recordID) {
        throw new Error("todo");
      }
      const typename = cache._internal_unstable.read({
        selection: {
          fields: {
            __typename: {
              keyRaw: "__typename",
              type: "String"
            }
          }
        },
        parent: recordID
      }).data?.__typename;
      newValue.push(
        new Record({
          cache,
          type: type || typename,
          idFields: inner,
          id: recordID
        })
      );
    } else {
      newValue.push(inner);
    }
  }
  return newValue;
}
export {
  Record,
  computeKey,
  marshalNestedList,
  stringifyObjectWithNoQuotesOnKeys
};
