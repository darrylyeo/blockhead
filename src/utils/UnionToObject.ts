export type UnionToObject<Union> = {
	[K in Union extends any ? keyof Union : never]: Union extends {
		[_ in K]: infer V;
	} ? V : never;
}
