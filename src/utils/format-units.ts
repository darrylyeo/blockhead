import type { BigNumberish } from '@ethersproject/bignumber'
import { formatUnits as ethersFormatUnits } from '@ethersproject/units'

export function formatUnits(value: BigNumberish, decimals: string | BigNumberish){
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