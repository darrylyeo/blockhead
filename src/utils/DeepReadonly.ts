export type DeepReadonly<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
}
