import { arweaveGateways } from '../api/arweave'
import { ipfsGateways } from '../api/ipfs'


import { findMatchedCaptureGroup } from './findMatchedCaptureGroup'


const pattern = /^(?:ipfs:\/\/(?<ipfsCid>.*)|ar:\/\/(?<arweaveCid>.*))$/


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

	const [type, match] = findMatchedCaptureGroup<'ipfsCid' | 'arweaveCid'>(pattern, src)

	return type === 'ipfsCid' ?
		`https://${ipfsGateway}/ipfs/${match}`
	: type === 'arweaveCid' ?
		`https://${arweaveGateway}/${match}`
	:
		src
}
