export type IpfsCid = `Qm${string}` | `bafy${string}` | `🚀${string}` | string


import { CID } from 'multiformats/cid'
import { bases } from 'multiformats/basics'
import { basesByPrefix, multicodecsByCode } from '../../data/multiformats'
import { substr } from 'runes2'
// import PeerId from 'peer-id'

// cidv0 ::= <multihash-content-address>
// QmRds34t1KFiatDY6yJFj8U9VPTLvSMsR63y7qdUV3RMmT
// <cidv1> ::= <multibase-prefix><cid-version><multicodec-content-type><multihash-content-address>
// zb2rhiVd5G2DSpnbYtty8NhYHeDvNkPxjSqA7YbDPuhdihj9L
export const decodeIpfsCid = (string: IpfsCid) => {
	const prefix = substr(string, 0, 1)
	// const prefix = value.normalize().slice(0, 1)
	const base = basesByPrefix[prefix]

	try {
		const cid = CID.parse(string, base)

		return {
			cid,
			multibase: cid.version === 0 ? bases.base58btc : base,
			multicodec: multicodecsByCode[cid.code],
			multihash: {
				...cid.multihash,
				multicodec: multicodecsByCode[cid.multihash.code],
			}
		}
	}catch(e){
		throw e

		// const peerId = PeerId.createFromB58String(value)
		// return decodeIpfsCid(peerId.toString())
	}
}


export const getAllIpfsCidEncodings = (cid: CID) => [
	{
		version: 0,
		base: {
			prefix: null,
			name: 'base58btc',
		},
		ipfsCid: cid.toV0().toString(),
	},
	...Object.values(bases).map(base => ({
		version: 1,
		base,
		ipfsCid: cid.toV1().toString(base),
	})),
]

// Label's max length in DNS (https://tools.ietf.org/html/rfc1034#page-7)
const dnsLabelMaxLength = 63

export const checkIpfsCidIsValidSubdomain = ({ base, ipfsCid }: { base: { name: string }, ipfsCid: IpfsCid }) => {
	if(['base32', 'base36'].includes(base.name)){
		return ipfsCid.length <= dnsLabelMaxLength
	}
}
