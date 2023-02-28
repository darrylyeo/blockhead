declare const brand: unique symbol

export type Branded<T, TBrand extends string> = T & {
	[brand]: TBrand
}
