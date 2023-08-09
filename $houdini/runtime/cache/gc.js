class GarbageCollector {
  cache;
  lifetimes = /* @__PURE__ */ new Map();
  get cacheBufferSize() {
    return this.cache._internal_unstable.config.cacheBufferSize ?? 10;
  }
  constructor(cache) {
    this.cache = cache;
  }
  reset() {
    this.lifetimes.clear();
  }
  resetLifetime(id, field) {
    if (!this.lifetimes.get(id)) {
      this.lifetimes.set(id, /* @__PURE__ */ new Map());
    }
    this.lifetimes.get(id).set(field, 0);
  }
  tick() {
    const dt_tick = Date.now().valueOf();
    const config_max_time = this.cache._internal_unstable.config.defaultLifetime;
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
          this.cache._internal_unstable.staleManager.delete(id, field);
        }
        if (config_max_time && config_max_time > 0) {
          const dt_valueOf = this.cache.getFieldTime(id, field);
          if (dt_valueOf && dt_tick - dt_valueOf > config_max_time) {
            this.cache._internal_unstable.staleManager.markFieldStale(id, field);
          }
        }
      }
    }
  }
}
export {
  GarbageCollector
};
