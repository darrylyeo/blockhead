import { computeKey } from "../lib";
class StaleManager {
  cache;
  fieldsTime = /* @__PURE__ */ new Map();
  constructor(cache) {
    this.cache = cache;
  }
  #initMapId = (id) => {
    if (!this.fieldsTime.get(id)) {
      this.fieldsTime.set(id, /* @__PURE__ */ new Map());
    }
  };
  getFieldTime(id, field) {
    return this.fieldsTime.get(id)?.get(field);
  }
  setFieldTimeToNow(id, field) {
    this.#initMapId(id);
    this.fieldsTime.get(id)?.set(field, new Date().valueOf());
  }
  markFieldStale(id, field) {
    this.#initMapId(id);
    this.fieldsTime.get(id)?.set(field, null);
  }
  markAllStale() {
    for (const [id, fieldMap] of this.fieldsTime.entries()) {
      for (const [field] of fieldMap.entries()) {
        this.markFieldStale(id, field);
      }
    }
  }
  markRecordStale(id) {
    const fieldsTimeOfType = this.fieldsTime.get(id);
    if (fieldsTimeOfType) {
      for (const [field] of fieldsTimeOfType.entries()) {
        this.markFieldStale(id, field);
      }
    }
  }
  markTypeStale(type) {
    for (const [id, fieldMap] of this.fieldsTime.entries()) {
      if (id.startsWith(`${type}:`)) {
        for (const [field] of fieldMap.entries()) {
          this.markFieldStale(id, field);
        }
      }
    }
  }
  markTypeFieldStale(type, field, when) {
    const key = computeKey({ field, args: when });
    for (const [id, fieldMap] of this.fieldsTime.entries()) {
      if (id.startsWith(`${type}:`)) {
        for (const local_field of fieldMap.keys()) {
          if (local_field === key) {
            this.markFieldStale(id, field);
          }
        }
      }
    }
  }
  delete(id, field) {
    if (this.fieldsTime.has(id)) {
      this.fieldsTime.get(id)?.delete(field);
      if (this.fieldsTime.get(id)?.size === 0) {
        this.fieldsTime.delete(id);
      }
    }
  }
  reset() {
    this.fieldsTime.clear();
  }
}
export {
  StaleManager
};
