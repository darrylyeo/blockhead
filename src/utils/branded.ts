declare const brand: unique symbol

export type Branded<T, TBrand extends string> = T & {
	[brand]: TBrand
}

export type BrandedString<TBrand extends string> = Branded<string, TBrand>
