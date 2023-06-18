import { arweaveGateways } from '../data/arweaveGateways'
import { ipfsGateways } from '../data/ipfsGateways'


import { findMatchedCaptureGroup } from './findMatchedCaptureGroup'


const pattern = /^(?:(?:ipfs|dweb):\/\/(?<ipfs>(?<ipfsCid>[^/]+)(?<ipfsPath>.+)?)|ar:\/\/(?<arweaveCid>.+))$/


export const resolveUri = ({
	src,
	ipfsGatewayDomain,
	arweaveGateway = arweaveGateways[0],
}: {
	src: string,
	ipfsGatewayDomain?: string,
	arweaveGateway?: string,
}) => {
	if(!src) return undefined

	if(ipfsGatewayDomain && ipfsGatewayDomain !== 'local')
		for(const { gatewayDomain } of ipfsGateways)
			if(gatewayDomain)
				src = src.replace(gatewayDomain, () => ipfsGatewayDomain)

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
		ipfsGatewayDomain === 'local' ?
			`ipfs://${groups.ipfsCid}${groups.ipfsPath ?? ''}`
		:
			`https://${ipfsGatewayDomain}/ipfs/${groups.ipfsCid}${groups.ipfsPath ?? ''}`
	: groups?.arweaveCid ?
		`https://${arweaveGateway}/${groups.arweaveCid}`
	:
		src
}
