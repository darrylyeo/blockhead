declare interface Boolean {
	constructor<T>(value: T | '' | null | undefined | 0): value is T
}

declare interface String {
	constructor<T extends number | bigint>(value: T): `${number}`
}

declare interface ObjectConstructor {
	entries<T>(o: T): {
		[K in keyof T]: readonly [K, T[K]];
	}[keyof T][];

	fromEntries<T extends readonly (readonly [keyof any, any])[]>(entries: T): { 
		[K in T[number][0]]: Extract<T[number], readonly [K, any]>[1] 
	};
}

declare interface Array<T> {
	filter<U extends T>(
		predicate: (value: T, index: number, array: T[]) => value is U
	): U[];

	map<U>(callbackfn: (value: T, index: number, array: ReadonlyArray<T>) => U): readonly U[];

	flatMap<U>(callbackfn: (value: T, index: number, array: T[]) => U[] | U, thisArg?: any):
		T extends (infer U)[] 
			? U extends (infer V)[] 
				? V
				: U 
			: T;

	join<U extends string | number>(separator: U): _Join<this, U>;
}

type _Join<
	Array extends readonly unknown[],
	Separator extends string | number,
> = Array extends readonly [infer V, ...infer A]
	? `${V & (string | number | bigint | boolean | null | undefined)}${A['length'] extends 0 ? '' : `${Separator}${_Join<A, Separator>}`}`
	: never
