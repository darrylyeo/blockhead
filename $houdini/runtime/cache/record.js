// for the most part, this is a very low-level/dumb class that is meant to track state related
// to a specific entity in the cached graph.
export class Record {
    constructor(cache, id) {
        this.fields = {};
        this.keyVersions = {};
        this.subscribers = {};
        this.recordLinks = {};
        this.listLinks = {};
        this.referenceCounts = {};
        this.lifetimes = new Map();
        this.cache = cache;
        this.id = id;
    }
    allSubscribers() {
        return Object.values(this.subscribers).flatMap((subscribers) => subscribers);
    }
    getField(fieldName) {
        return this.fields[fieldName];
    }
    writeField(fieldName, value) {
        this.fields[fieldName] = value;
    }
    writeRecordLink(fieldName, value) {
        this.recordLinks[fieldName] = value;
    }
    writeListLink(fieldName, value) {
        this.listLinks[fieldName] = value;
    }
    linkedRecord(fieldName) {
        const linkedRecord = this.recordLinks[fieldName];
        if (linkedRecord === null) {
            return null;
        }
        return this.cache.internal.getRecord(linkedRecord);
    }
    linkedRecordID(fieldName) {
        return this.recordLinks[fieldName];
    }
    linkedListIDs(fieldName) {
        const ids = [];
        // we need to flatten the list links
        const unvisited = [this.listLinks[fieldName] || []];
        while (unvisited.length > 0) {
            const target = unvisited.shift();
            for (const id of target) {
                if (Array.isArray(id)) {
                    unvisited.push(id);
                    continue;
                }
                ids.push(id);
            }
        }
        return ids;
    }
    flatLinkedList(fieldName) {
        return this.linkedListIDs(fieldName).map(this.cache.internal.getRecord);
    }
    appendLinkedList(fieldName, id) {
        // this could be the first time we've seen the list
        if (!this.listLinks[fieldName]) {
            this.listLinks[fieldName] = [];
        }
        this.listLinks[fieldName].push(id);
    }
    prependLinkedList(fieldName, id) {
        // this could be the first time we've seen the list
        if (!this.listLinks[fieldName]) {
            this.listLinks[fieldName] = [];
        }
        this.listLinks[fieldName].unshift(id);
    }
    removeFromLinkedList(fieldName, id) {
        this.listLinks[fieldName] = (this.listLinks[fieldName] || []).filter((link) => link !== id);
    }
    addSubscriber(rawKey, key, ...specs) {
        // if this is the first time we've seen the raw key
        if (!this.keyVersions[rawKey]) {
            this.keyVersions[rawKey] = new Set();
        }
        // add this version of the key if we need to
        this.keyVersions[rawKey].add(key);
        // the existing list
        const existingSubscribers = (this.subscribers[key] || []).map(({ set }) => set);
        // the list of new subscribers
        const newSubscribers = specs.filter(({ set }) => !existingSubscribers.includes(set));
        this.subscribers[key] = this.getSubscribers(key).concat(...newSubscribers);
        // if this is the first time we've seen this key
        if (!this.referenceCounts[key]) {
            this.referenceCounts[key] = new Map();
        }
        const counts = this.referenceCounts[key];
        // clear the lifetime count for the field
        this.lifetimes.delete(key);
        // increment the reference count for every subscriber
        for (const spec of specs) {
            // we're going to increment the current value by one
            counts.set(spec.set, (counts.get(spec.set) || 0) + 1);
        }
    }
    getSubscribers(fieldName) {
        return this.subscribers[fieldName] || [];
    }
    forgetSubscribers(...targets) {
        this.forgetSubscribers_walk(targets.map(({ set }) => set));
    }
    removeAllSubscribers() {
        this.forgetSubscribers(...this.allSubscribers());
    }
    removeAllSubscriptionVersions(keyRaw, spec) {
        // visit every version of the key we've seen and remove the spec from the list of subscribers
        const versions = this.keyVersions[keyRaw];
        // if there are no known versions, we're done
        if (!versions) {
            return;
        }
        this.removeSubscribers([...this.keyVersions[keyRaw]], [spec.set]);
    }
    forgetSubscribers_walk(targets, visited = []) {
        var _a;
        // clean up any subscribers that reference the set
        this.removeSubscribers(Object.keys(this.subscribers), targets);
        visited.push(this.id);
        // walk down to every record we know about
        const linkedIDs = Object.keys(this.recordLinks);
        for (const key of Object.keys(this.listLinks)) {
            for (const child of this.linkedListIDs(key)) {
                if (child !== null) {
                    linkedIDs.push(child);
                }
            }
        }
        for (const linkedRecordID of linkedIDs) {
            if (visited.includes(linkedRecordID)) {
                continue;
            }
            (_a = this.cache.internal.getRecord(linkedRecordID)) === null || _a === void 0 ? void 0 : _a.forgetSubscribers_walk(targets, visited);
        }
    }
    removeSubscribers(fields, sets) {
        var _a;
        // clean up any subscribers that reference the set
        for (const fieldName of fields) {
            // build up a list of the sets we actually need to remove after
            // checking reference counts
            let targets = [];
            for (const set of sets) {
                // if we dont know this field/set combo, there's nothing to do (probably a bug somewhere)
                if (!((_a = this.referenceCounts[fieldName]) === null || _a === void 0 ? void 0 : _a.has(set))) {
                    continue;
                }
                const counts = this.referenceCounts[fieldName];
                const newVal = (counts.get(set) || 0) - 1;
                // decrement the reference of every field
                counts.set(set, newVal);
                // if that was the last reference we knew of
                if (newVal <= 0) {
                    targets.push(set);
                    // remove the reference to the set function
                    counts.delete(set);
                }
            }
            // we do need to remove the set from the list
            this.subscribers[fieldName] = this.getSubscribers(fieldName).filter(({ set }) => !targets.includes(set));
        }
    }
    // this function is invoked by the cache when the garbage collector is ticking
    onGcTick() {
        const fields = Object.keys(this.fields)
            .concat(Object.keys(this.listLinks))
            .concat(Object.keys(this.recordLinks));
        // any fields with no reference counts need to be decremented
        for (const field of fields) {
            // {value} has a key for every subscriber - can check for no subscribers by looking
            // at the number of fields in the value
            if (!this.referenceCounts[field] || this.referenceCounts[field].size === 0) {
                // lower the current count by 1
                const previousCount = this.lifetimes.get(field) || 0;
                this.lifetimes.set(field, previousCount + 1);
                // if the lifetime exceeds the cache's buffer size we should remove the field, linked record, or list
                if (this.lifetimes.get(field) > this.cache.cacheBufferSize) {
                    delete this.fields[field];
                    delete this.recordLinks[field];
                    delete this.recordLinks[field];
                    // if we dont have any data left, delete the record from the cache
                    if (Object.keys(this.fields).length === 0 &&
                        Object.keys(this.recordLinks).length === 0 &&
                        Object.keys(this.recordLinks).length === 0) {
                        this.cache.internal.deleteID(this.id);
                    }
                }
            }
        }
    }
}
