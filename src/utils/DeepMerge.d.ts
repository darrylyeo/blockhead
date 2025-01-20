export type DeepMerge<T extends readonly any[]> = (
	T extends [infer F, ...infer R] ?
		DeepMergeTwoTypes<F, DeepMerge<R>>
	:
		unknown
)

export type DeepMergeTwoTypes<T, U> = (
	T extends object ?
		U extends object ?
			{
				[K in keyof T | keyof U]: (
					K extends keyof T ?
						K extends keyof U ?
							DeepMergeTwoTypes<T[K], U[K]>
						:
							T[K]
					: K extends keyof U ?
						U[K]
					:
						never
				)
			}
		:
			T
	:
		U
)
