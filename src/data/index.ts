export const parseUsdPrice = (priceData: any): number | undefined => {
	if (!priceData?.usd) return undefined
	const price = parseFloat(priceData.usd)
	return isNaN(price) || price < 0 ? undefined : price
}

export const calculateUsdValue = (balance: string, decimals: number, priceUsd?: number): bigint | undefined => {
	if (!priceUsd || !balance || balance === '0') return undefined
	
	try {
		const balanceBigInt = BigInt(balance)
		const balanceFloat = Number(balanceBigInt) / Math.pow(10, decimals)
		const usdValue = balanceFloat * priceUsd
		
		if (isNaN(usdValue) || usdValue < 0.000001) return undefined
		
		return BigInt(Math.floor(usdValue * 1000000))
	} catch {
		return undefined
	}
} 