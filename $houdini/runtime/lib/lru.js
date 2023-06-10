class LRUCache {
  _capacity;
  _map;
  constructor(capacity = 1e3) {
    this._capacity = capacity;
    this._map = /* @__PURE__ */ new Map();
  }
  set(key, value) {
    this._map.delete(key);
    this._map.set(key, value);
    if (this._map.size > this._capacity) {
      const firstKey = this._map.keys().next();
      if (!firstKey.done) {
        this._map.delete(firstKey.value);
      }
    }
  }
  get(key) {
    const value = this._map.get(key);
    if (value != null) {
      this._map.delete(key);
      this._map.set(key, value);
    }
    return value ?? null;
  }
  has(key) {
    return this._map.has(key);
  }
  delete(key) {
    this._map.delete(key);
  }
  size() {
    return this._map.size;
  }
  capacity() {
    return this._capacity - this._map.size;
  }
  clear() {
    this._map.clear();
  }
}
function createLRUCache(capacity = 1e3) {
  return new LRUCache(capacity);
}
export {
  LRUCache,
  createLRUCache
};
