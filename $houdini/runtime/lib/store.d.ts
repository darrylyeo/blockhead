export declare class Writable<T> {
    #private;
    state: T;
    constructor(value: T, start?: StartStopNotifier<T>);
    set(new_value: T): void;
    update(fn: Updater<T>): void;
    subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
}
/** Start and stop notification callbacks. */
type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;
/** Callback to inform of a value updates. */
export type Subscriber<T> = (value: T) => void;
/** Unsubscribes from value updates. */
export type Unsubscriber = () => void;
/** Callback to update a value. */
type Updater<T> = (value: T) => T;
/** Cleanup logic callback. */
type Invalidator<T> = (value?: T) => void;
export {};
