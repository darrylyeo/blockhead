import { type BigNumberish, formatUnits as ethersFormatUnits } from 'ethers'

export const formatUnits = (value: BigNumberish, decimals: string | BigNumberish) => {
	try {
		return ethersFormatUnits(value ?? 0, decimals)
	}catch(e){
		// try {
		// 	return ethersFormatUnits(BigInt(value || 0).toString(), decimals)
		// }catch(e){
		// 	try {
		// 		return ethersFormatUnits(Math.round(value || 0), decimals)
		// 	}catch(e){
				return Number(value) * (0.1 ** decimals)
		// 	}
		// }
	}
}
