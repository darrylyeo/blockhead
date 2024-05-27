import { arweaveGateways } from '$/data/arweaveGateways'
import { ipfsGateways } from '$/data/ipfsGateways'


import { findMatchedCaptureGroup } from './findMatchedCaptureGroup'


const pattern = /^(?:(?:ipfs|dweb):\/\/(?<ipfs>(?<ipfsCid>[^/]+)(?<ipfsPath>.+)?)|ipns:\/\/(?<ipns>(?<ipnsName>[^/]+)(?<ipnsPath>.+)?)|ar:\/\/(?<arweaveCid>.+))$/


export const resolveUri = ({
	src,
	ipfsGatewayDomain,
	arweaveGatewayDomain = arweaveGateways[0].gatewayDomain,
}: {
	src: string,
	ipfsGatewayDomain?: string,
	arweaveGatewayDomain?: string,
}) => {
	if(!src) return undefined

	if(ipfsGatewayDomain && ipfsGatewayDomain !== 'local')
		for(const { gatewayDomain } of ipfsGateways)
			if(gatewayDomain)
				src = src.replace(gatewayDomain, () => ipfsGatewayDomain)

	for(const { gatewayDomain } of arweaveGateways)
		src = src.replace(gatewayDomain, () => arweaveGatewayDomain)

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
	: groups?.ipnsName ?
		ipfsGatewayDomain === 'local' ?
			`ipns://${groups.ipnsName}${groups.ipnsPath ?? ''}`
		:
			`https://${ipfsGatewayDomain}/ipns/${groups.ipnsName}${groups.ipnsPath ?? ''}`
	: groups?.arweaveCid ?
		`https://${arweaveGatewayDomain}/${groups.arweaveCid}`
	:
		src
}
