import { flatten } from "../lib/flatten";
import { getFieldsForType } from "../lib/selection";
import { rootID } from "./cache";
import { evaluateKey } from "./stuff";
class InMemorySubscriptions {
  cache;
  constructor(cache) {
    this.cache = cache;
  }
  subscribers = {};
  referenceCounts = {};
  keyVersions = {};
  activeFields(parent) {
    return Object.keys(this.subscribers[parent] || {});
  }
  add({
    parent,
    spec,
    selection,
    variables,
    parentType
  }) {
    const __typename = this.cache._internal_unstable.storage.get(parent, "__typename").value;
    let targetSelection = getFieldsForType(selection, __typename, false);
    for (const fieldSelection of Object.values(targetSelection || {})) {
      const {
        keyRaw,
        selection: innerSelection,
        type,
        list,
        filters,
        visible
      } = fieldSelection;
      if (!visible) {
        continue;
      }
      const key = evaluateKey(keyRaw, variables);
      let targetSelection2;
      if (innerSelection) {
        const __typename2 = this.cache._internal_unstable.storage.get(parent, "__typename").value;
        targetSelection2 = getFieldsForType(innerSelection, __typename2, false);
      }
      this.addFieldSubscription({
        id: parent,
        key,
        selection: [spec, targetSelection2],
        type
      });
      if (list) {
        this.registerList({
          list,
          filters,
          id: parent,
          key,
          variables,
          selection: innerSelection,
          parentType: parentType || spec.rootType
        });
      }
      if (innerSelection) {
        const { value: linkedRecord } = this.cache._internal_unstable.storage.get(
          parent,
          key
        );
        let children = !Array.isArray(linkedRecord) ? [linkedRecord] : flatten(linkedRecord) || [];
        for (const child of children) {
          if (!child) {
            continue;
          }
          this.add({
            parent: child,
            spec,
            selection: innerSelection,
            variables,
            parentType: type
          });
        }
      }
    }
  }
  addFieldSubscription({
    id,
    key,
    selection,
    type
  }) {
    const spec = selection[0];
    if (!this.subscribers[id]) {
      this.subscribers[id] = {};
    }
    if (!this.subscribers[id][key]) {
      this.subscribers[id][key] = [];
    }
    if (!this.keyVersions[key]) {
      this.keyVersions[key] = /* @__PURE__ */ new Set();
    }
    this.keyVersions[key].add(key);
    if (!this.subscribers[id][key].map(([{ set }]) => set).includes(spec.set)) {
      this.subscribers[id][key].push([spec, selection[1]]);
    }
    if (!this.referenceCounts[id]) {
      this.referenceCounts[id] = {};
    }
    if (!this.referenceCounts[id][key]) {
      this.referenceCounts[id][key] = /* @__PURE__ */ new Map();
    }
    const counts = this.referenceCounts[id][key];
    counts.set(spec.set, (counts.get(spec.set) || 0) + 1);
    this.cache._internal_unstable.lifetimes.resetLifetime(id, key);
  }
  registerList({
    list,
    id,
    key,
    parentType,
    selection,
    filters,
    variables
  }) {
    this.cache._internal_unstable.lists.add({
      name: list.name,
      connection: list.connection,
      recordID: id,
      recordType: this.cache._internal_unstable.storage.get(id, "__typename")?.value || parentType,
      listType: list.type,
      key,
      selection,
      filters: Object.entries(filters || {}).reduce((acc, [key2, { kind, value }]) => {
        return {
          ...acc,
          [key2]: kind !== "Variable" ? value : variables[value]
        };
      }, {})
    });
  }
  addMany({
    parent,
    variables,
    subscribers,
    parentType
  }) {
    for (const [spec, targetSelection] of subscribers) {
      for (const selection of Object.values(targetSelection ?? {})) {
        const {
          type: linkedType,
          keyRaw,
          selection: innerSelection,
          list,
          filters
        } = selection;
        const key = evaluateKey(keyRaw, variables);
        const fieldSelection = innerSelection ? getFieldsForType(innerSelection, parentType, false) : void 0;
        this.addFieldSubscription({
          id: parent,
          key,
          selection: [spec, fieldSelection],
          type: linkedType
        });
        if (list) {
          this.registerList({
            list,
            filters,
            id: parent,
            key,
            variables,
            selection: innerSelection,
            parentType: parentType || spec.rootType
          });
        }
        const childSelection = selection.selection;
        if (childSelection) {
          const { value: link } = this.cache._internal_unstable.storage.get(parent, key);
          const children = !Array.isArray(link) ? [link] : flatten(link);
          for (const linkedRecord of children) {
            if (!linkedRecord) {
              continue;
            }
            const __typename = this.cache._internal_unstable.storage.get(
              linkedRecord,
              "__typename"
            ).value;
            let targetSelection2 = getFieldsForType(childSelection, __typename, false);
            this.addMany({
              parent: linkedRecord,
              variables,
              subscribers: subscribers.map(([sub]) => [sub, targetSelection2]),
              parentType: linkedType
            });
          }
        }
      }
    }
  }
  get(id, field) {
    return this.subscribers[id]?.[field] || [];
  }
  remove(id, selection, targets, variables, visited = []) {
    visited.push(id);
    const linkedIDs = [];
    const __typename = this.cache._internal_unstable.storage.get(id, "__typename").value;
    let targetSelection = getFieldsForType(selection, __typename, false);
    for (const fieldSelection of Object.values(targetSelection || {})) {
      const key = evaluateKey(fieldSelection.keyRaw, variables);
      this.removeSubscribers(id, key, targets);
      if (!fieldSelection.selection) {
        continue;
      }
      const { value: previousValue } = this.cache._internal_unstable.storage.get(id, key);
      const links = !Array.isArray(previousValue) ? [previousValue] : flatten(previousValue);
      for (const link of links) {
        if (link !== null) {
          linkedIDs.push([link, fieldSelection.selection || {}]);
        }
      }
    }
    for (const [linkedRecordID, linkFields] of linkedIDs) {
      this.remove(linkedRecordID, linkFields, targets, visited);
    }
  }
  reset() {
    const subscribers = Object.entries(this.subscribers).filter(
      ([id]) => !id.startsWith(rootID)
    );
    for (const [id, _fields] of subscribers) {
      delete this.subscribers[id];
    }
    const subscriptionSpecs = subscribers.flatMap(
      ([_id, fields]) => Object.values(fields).flatMap((field) => field.map(([spec]) => spec))
    );
    return subscriptionSpecs;
  }
  removeSubscribers(id, fieldName, specs) {
    let targets = [];
    for (const spec of specs) {
      if (!this.referenceCounts[id]?.[fieldName]?.has(spec.set)) {
        continue;
      }
      const counts = this.referenceCounts[id][fieldName];
      const newVal = (counts.get(spec.set) || 0) - 1;
      counts.set(spec.set, newVal);
      if (newVal <= 0) {
        targets.push(spec.set);
        counts.delete(spec.set);
      }
    }
    if (this.subscribers[id]) {
      this.subscribers[id][fieldName] = this.get(id, fieldName).filter(
        ([{ set }]) => !targets.includes(set)
      );
    }
  }
  removeAllSubscribers(id, targets, visited = []) {
    visited.push(id);
    for (const field of Object.keys(this.subscribers[id] || [])) {
      const subscribers = targets || this.subscribers[id][field].map(([spec]) => spec);
      this.removeSubscribers(id, field, subscribers);
      const { value, kind } = this.cache._internal_unstable.storage.get(id, field);
      if (kind === "scalar") {
        continue;
      }
      const nextTargets = Array.isArray(value) ? flatten(value) : [value];
      for (const id2 of nextTargets) {
        if (visited.includes(id2)) {
          continue;
        }
        this.removeAllSubscribers(id2, subscribers, visited);
      }
    }
  }
}
export {
  InMemorySubscriptions
};
