class GarbageCollector {
  cache;
  lifetimes = /* @__PURE__ */ new Map();
  get cacheBufferSize() {
    return this.cache._internal_unstable.config.cacheBufferSize ?? 10;
  }
  constructor(cache) {
    this.cache = cache;
  }
  resetLifetime(id, field) {
    if (!this.lifetimes.get(id)) {
      this.lifetimes.set(id, /* @__PURE__ */ new Map());
    }
    this.lifetimes.get(id).set(field, 0);
  }
  tick() {
    for (const [id, fieldMap] of this.lifetimes.entries()) {
      for (const [field, lifetime] of fieldMap.entries()) {
        if (this.cache._internal_unstable.subscriptions.get(id, field).length > 0) {
          continue;
        }
        fieldMap.set(field, lifetime + 1);
        if (fieldMap.get(field) > this.cacheBufferSize) {
          this.cache._internal_unstable.storage.deleteField(id, field);
          this.cache._internal_unstable.lists.deleteField(id, field);
          fieldMap.delete(field);
          if ([...fieldMap.keys()].length === 0) {
            this.lifetimes.delete(id);
          }
        }
      }
    }
  }
}
export {
  GarbageCollector
};
