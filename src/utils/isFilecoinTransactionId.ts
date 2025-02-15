import { decodeIpfsCid } from '$/api/ipfs/contentId'
import { isEvmTransactionId } from './isEvmTransactionId'

export const isFilecoinTransactionId = (string: string) => {
	if(isEvmTransactionId(string))
		return true

	try {
		const ipfsCid = decodeIpfsCid(string)
		return true
	}catch{
		return false
	}
}
