import { keyFieldsForType } from "../lib";
import { _typeInfo } from "./cache";
import { Record } from "./record";
class ListCollection {
  #parentID;
  #allLists;
  #when;
  #cache;
  #name;
  constructor({
    parentID,
    allLists,
    when,
    cache,
    name
  }) {
    this.#parentID = parentID;
    this.#allLists = allLists;
    this.#when = when;
    this.#cache = cache;
    this.#name = name;
  }
  append(...records) {
    if (!this.#collection) {
      return;
    }
    const { selection, data } = this.#listOperationPayload(records);
    for (const entry of data) {
      if (entry) {
        this.#collection.append(selection, entry);
      }
    }
  }
  prepend(...records) {
    if (!this.#collection) {
      return;
    }
    const { selection, data } = this.#listOperationPayload(records);
    for (const entry of data) {
      if (entry) {
        this.#collection.prepend(selection, entry);
      }
    }
  }
  toggle(where, ...records) {
    if (!this.#collection) {
      return;
    }
    const { selection, data } = this.#listOperationPayload(records);
    for (const entry of data) {
      if (entry) {
        this.#collection.toggleElement(selection, entry, {}, where);
      }
    }
  }
  when(filter) {
    if (!this.#collection) {
      return this;
    }
    return new ListCollection({
      parentID: this.#parentID,
      allLists: this.#allLists,
      when: this.#when,
      cache: this.#cache,
      name: this.#name
    });
  }
  remove(...records) {
    if (!this.#collection) {
      return;
    }
    for (const record of records) {
      if (record) {
        this.#collection.remove(record.idFields);
      }
    }
  }
  *[Symbol.iterator]() {
    for (const entry of this.#collection ?? []) {
      yield entry;
    }
  }
  get #collection() {
    try {
      const list = this.#cache._internal_unstable.list(
        this.#name,
        this.#parentID,
        this.#allLists
      );
      if (this.#when) {
        return list.when(this.#when);
      }
      return list;
    } catch {
      return null;
    }
  }
  #listOperationPayload(records) {
    const selection = {
      abstractFields: {
        fields: {},
        typeMap: {}
      }
    };
    const data = [];
    for (const record of records) {
      if (!(record instanceof Record)) {
        throw new Error("You must provide a Record to a list operation");
      }
      const keys = keyFieldsForType(this.#cache.config, record.type);
      selection.abstractFields.fields[record.type] = keys.reduce(
        (acc, key) => {
          const keyInfo = _typeInfo(this.#cache, record.type, key);
          return {
            ...acc,
            [key]: {
              type: keyInfo.type,
              keyRaw: key
            }
          };
        },
        {
          __typename: {
            type: "String",
            keyRaw: "__typename"
          }
        }
      );
      data.push({ __typename: record.type, ...record.idFields });
    }
    return {
      selection,
      data
    };
  }
}
export {
  ListCollection
};
