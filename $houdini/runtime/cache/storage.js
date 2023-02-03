import { flattenList } from "./stuff";
class InMemoryStorage {
  data;
  idCount = 0;
  rank = 0;
  constructor() {
    this.data = [];
  }
  get layerCount() {
    return this.data.length;
  }
  get nextRank() {
    return this.rank++;
  }
  createLayer(optimistic = false) {
    const layer = new Layer(this.idCount++);
    layer.optimistic = optimistic;
    this.data.push(layer);
    return layer;
  }
  insert(id, field, location, target) {
    return this.topLayer.insert(id, field, location, target);
  }
  remove(id, field, target) {
    return this.topLayer.remove(id, field, target);
  }
  delete(id) {
    return this.topLayer.delete(id);
  }
  deleteField(id, field) {
    return this.topLayer.deleteField(id, field);
  }
  getLayer(id) {
    for (const layer of this.data) {
      if (layer.id === id) {
        return layer;
      }
    }
    throw new Error("Could not find layer with id: " + id);
  }
  replaceID(replacement) {
    for (const layer of this.data) {
      layer.replaceID(replacement);
    }
  }
  get(id, field) {
    const operations = {
      [OperationKind.insert]: {
        [OperationLocation.start]: [],
        [OperationLocation.end]: []
      },
      [OperationKind.remove]: /* @__PURE__ */ new Set()
    };
    const layerIDs = [];
    for (let i = this.data.length - 1; i >= 0; i--) {
      const layer = this.data[i];
      const [layerValue, kind] = layer.get(id, field);
      const layerOperations = layer.getOperations(id, field) || [];
      layer.deletedIDs.forEach((v) => {
        if (layer.operations[v]?.undoDeletesInList?.includes(field)) {
          return;
        }
        operations.remove.add(v);
      });
      if (typeof layerValue === "undefined" && layerOperations.length === 0) {
        if (layer.deletedIDs.size > 0) {
          layerIDs.push(layer.id);
        }
        continue;
      }
      if (typeof layerValue !== "undefined" && !Array.isArray(layerValue)) {
        return {
          value: layerValue,
          kind,
          displayLayers: [layer.id]
        };
      }
      layerIDs.push(layer.id);
      if (layerOperations.length > 0) {
        for (const op of layerOperations) {
          if (isRemoveOperation(op)) {
            operations.remove.add(op.id);
          }
          if (isInsertOperation(op)) {
            operations.insert[op.location].unshift(op.id);
          }
          if (isDeleteOperation(op)) {
            return {
              value: void 0,
              kind: "unknown",
              displayLayers: []
            };
          }
        }
      }
      if (typeof layerValue === "undefined") {
        continue;
      }
      if (!operations.remove.size && !operations.insert.start.length && !operations.insert.end.length) {
        return { value: layerValue, displayLayers: layerIDs, kind: "link" };
      }
      return {
        value: [...operations.insert.start, ...layerValue, ...operations.insert.end].filter(
          (value) => !operations.remove.has(value)
        ),
        displayLayers: layerIDs,
        kind
      };
    }
    return {
      value: void 0,
      kind: "unknown",
      displayLayers: []
    };
  }
  writeLink(id, field, value) {
    return this.topLayer.writeLink(id, field, value);
  }
  writeField(id, field, value) {
    return this.topLayer.writeField(id, field, value);
  }
  resolveLayer(id) {
    let startingIndex = null;
    for (const [index, layer] of this.data.entries()) {
      if (layer.id !== id) {
        continue;
      }
      startingIndex = index - 1;
      this.data[index].optimistic = false;
      break;
    }
    if (startingIndex === null) {
      throw new Error("could not find layer with id: " + id);
    }
    if (startingIndex === -1) {
      startingIndex = 0;
    }
    if (this.data[startingIndex].optimistic) {
      startingIndex++;
    }
    const baseLayer = this.data[startingIndex];
    let layerIndex = startingIndex;
    while (layerIndex < this.data.length) {
      const layer = this.data[layerIndex++];
      if (layer.optimistic) {
        layerIndex--;
        break;
      }
      baseLayer.writeLayer(layer);
    }
    this.data.splice(startingIndex + 1, layerIndex - startingIndex - 1);
  }
  get topLayer() {
    if (this.data.length === 0) {
      this.createLayer();
    }
    if (this.data[this.data.length - 1]?.optimistic) {
      this.createLayer();
    }
    return this.data[this.data.length - 1];
  }
}
class Layer {
  id;
  optimistic = false;
  fields = {};
  links = {};
  operations = {};
  deletedIDs = /* @__PURE__ */ new Set();
  constructor(id) {
    this.id = id;
  }
  get(id, field) {
    if (typeof this.links[id]?.[field] !== "undefined") {
      return [this.links[id][field], "link"];
    }
    return [this.fields[id]?.[field], "scalar"];
  }
  getOperations(id, field) {
    if (this.operations[id]?.deleted) {
      return [
        {
          kind: OperationKind.delete,
          target: id
        }
      ];
    }
    if (this.operations[id]?.fields?.[field]) {
      return this.operations[id].fields[field];
    }
  }
  writeField(id, field, value) {
    this.fields[id] = {
      ...this.fields[id],
      [field]: value
    };
    return this.id;
  }
  writeLink(id, field, value) {
    const valueList = Array.isArray(value) ? value : [value];
    for (const value2 of flattenList(valueList)) {
      if (!value2) {
        continue;
      }
      const fieldOperations = this.operations[id]?.fields[field];
      if (this.operations[value2]?.deleted || this.deletedIDs.has(value2)) {
        this.operations[value2] = {
          ...this.operations[value2],
          undoDeletesInList: [...this.operations[id]?.undoDeletesInList || [], field]
        };
      } else if (value2 && fieldOperations?.length > 0) {
        this.operations[id].fields[field] = fieldOperations.filter(
          (op) => op.kind !== "remove" || op.id !== value2
        );
      }
    }
    this.links[id] = {
      ...this.links[id],
      [field]: value
    };
    return this.id;
  }
  isDisplayLayer(displayLayers) {
    return displayLayers.length === 0 || displayLayers.includes(this.id) || Math.max(...displayLayers) < this.id;
  }
  clear() {
    this.links = {};
    this.fields = {};
    this.operations = {};
    this.deletedIDs = /* @__PURE__ */ new Set();
  }
  replaceID({ from, to }) {
    this.fields[to] = this.fields[from];
    this.links[to] = this.links[from];
    this.operations[to] = this.operations[from] || { fields: {} };
    if (this.deletedIDs.has(from)) {
      this.deletedIDs.add(to);
    }
  }
  removeUndefinedFields() {
    for (const [id, fields] of Object.entries(this.fields)) {
      for (const [field, value] of Object.entries(fields)) {
        if (typeof value === "undefined") {
          try {
            delete this.fields[id][field];
          } catch {
          }
          try {
            delete this.links[id][field];
          } catch {
          }
        }
      }
      if (Object.keys(fields || {}).length === 0) {
        delete this.fields[id];
      }
      if (Object.keys(this.links[id] || {}).length === 0) {
        delete this.links[id];
      }
    }
  }
  delete(id) {
    this.operations = {
      ...this.operations,
      [id]: {
        ...this.operations[id],
        deleted: true,
        undoDeletesInList: []
      }
    };
    this.deletedIDs.add(id);
  }
  deleteField(id, field) {
    this.fields[id] = {
      ...this.fields[id],
      [field]: void 0
    };
  }
  insert(id, field, where, target) {
    this.addFieldOperation(id, field, {
      kind: OperationKind.insert,
      id: target,
      location: where
    });
  }
  remove(id, field, target) {
    this.addFieldOperation(id, field, {
      kind: OperationKind.remove,
      id: target
    });
  }
  writeLayer(layer) {
    if (layer.id === this.id) {
      return;
    }
    for (const [id, ops] of Object.entries(layer.operations)) {
      const fields = {};
      for (const opMap of [this.operations[id], layer.operations[id]].filter(Boolean)) {
        for (const [fieldName, operations] of Object.entries(opMap.fields || {})) {
          fields[fieldName] = [...fields[fieldName] || [], ...operations];
        }
      }
      if (Object.keys(fields).length > 0) {
        this.operations[id] = {
          ...this.operations[id],
          fields
        };
      }
      if (ops?.deleted) {
        delete this.fields[id];
        delete this.links[id];
      }
    }
    for (const [id, values] of Object.entries(layer.fields)) {
      if (!values) {
        continue;
      }
      for (const [field, value] of Object.entries(values)) {
        this.writeField(id, field, value);
      }
    }
    for (const [id, values] of Object.entries(layer.links)) {
      if (!values) {
        continue;
      }
      for (const [field, value] of Object.entries(values)) {
        this.writeLink(id, field, value);
      }
    }
    layer.deletedIDs.forEach((v) => this.deletedIDs.add(v));
  }
  addFieldOperation(id, field, operation) {
    this.operations = {
      ...this.operations,
      [id]: {
        ...this.operations[id],
        fields: {
          [field]: [...this.operations[id]?.fields[field] || [], operation]
        }
      }
    };
  }
}
function isDeleteOperation(value) {
  return !!value && value.kind === OperationKind.delete;
}
function isInsertOperation(value) {
  return !!value && value.kind === OperationKind.insert;
}
function isRemoveOperation(value) {
  return !!value && value.kind === OperationKind.remove;
}
var OperationLocation = /* @__PURE__ */ ((OperationLocation2) => {
  OperationLocation2["start"] = "start";
  OperationLocation2["end"] = "end";
  return OperationLocation2;
})(OperationLocation || {});
var OperationKind = /* @__PURE__ */ ((OperationKind2) => {
  OperationKind2["delete"] = "delete";
  OperationKind2["insert"] = "insert";
  OperationKind2["remove"] = "remove";
  return OperationKind2;
})(OperationKind || {});
export {
  InMemoryStorage,
  Layer,
  OperationKind,
  OperationLocation
};
