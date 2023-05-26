const subscriber_queue = [];
const noop = () => {
};
class Writable {
  state;
  #subscribers;
  #stop;
  #start;
  constructor(value, start = noop) {
    this.state = value;
    this.#subscribers = /* @__PURE__ */ new Set();
    this.#stop = null;
    this.#start = start;
  }
  set(new_value) {
    if (safe_not_equal(this.state, new_value)) {
      this.state = new_value;
      if (this.#stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of this.#subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, this.state);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  update(fn) {
    this.set(fn(this.state));
  }
  subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    this.#subscribers.add(subscriber);
    if (this.#subscribers.size === 1) {
      this.#stop = this.#start(this.set) || noop;
    }
    run(this.state);
    return () => {
      this.#subscribers.delete(subscriber);
      if (this.#subscribers.size === 0) {
        this.#stop?.();
        this.#stop = null;
      }
    };
  }
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
export {
  Writable
};
