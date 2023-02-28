let compound
const initCompound = async () => {
	const Compound = await import('@compound-finance/compound-js')

	return compound || (compound = 
		// @ts-ignore
		new Compound(globalThis.ethereum)
	)
}

export const getCompoundPriceFeed = async (token, baseToken) => {
	const Compound = await import('@compound-finance/compound-js')
	const compound = await initCompound()
	return await compound.getPrice(Compound[token], baseToken)
}