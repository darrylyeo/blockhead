import { arweaveGateways } from '../data/arweaveGateways'
import { ipfsGateways } from '../data/ipfsGateways'


import { findMatchedCaptureGroup } from './findMatchedCaptureGroup'


const pattern = /^(?:(?:ipfs|dweb):\/\/(?<ipfs>(?<ipfsCid>[^/]+)(?<ipfsPath>.+)?)|ar:\/\/(?<arweaveCid>.+))$/


export const resolveUri = ({
	src,
	ipfsGateway = ipfsGateways[0],
	arweaveGateway = arweaveGateways[0],
}: {
	src: string,
	ipfsGateway?: string,
	arweaveGateway?: string,
}) => {
	if(!src) return undefined

	for(const gateway of ipfsGateways)
		src = src.replace(gateway, () => ipfsGateway)

	for(const gateway of arweaveGateways)
		src = src.replace(gateway, () => arweaveGateway)

	// const [type, contentId] = findMatchedCaptureGroup<'ipfsCid' | 'arweaveCid'>(pattern, src)
	// return type === 'ipfsCid' ?
	// 	`https://${ipfsGateway}/ipfs/${match}`
	// : type === 'arweaveCid' ?
	// 	`https://${arweaveGateway}/${match}`
	// :
	// 	src

	const { groups } = src.match(pattern) ?? {}

	return groups?.ipfsCid ?
		`https://${ipfsGateway}/ipfs/${groups.ipfsCid}${groups.ipfsPath ?? ''}`
	: groups?.arweaveCid ?
		`https://${arweaveGateway}/${groups.arweaveCid}`
	:
		src
}
