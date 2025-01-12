import { decodeIpfsCid } from '$/api/ipfs/contentId'

export const isFilecoinBlockCid = (string: string) => {
	try {
		const ipfsCid = decodeIpfsCid(string)
		return true
	}catch{
		return false
	}
}
