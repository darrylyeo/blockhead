import { decodeIpfsCid } from '$/api/ipfs/contentId'

export const isFilecoinTipsetId = (string: string) => {
	if(!isNaN(Number(string)))
		return true

	try {
		const ipfsCid = decodeIpfsCid(string)
		return true
	}catch{
		return false
	}
}
