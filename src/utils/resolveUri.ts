import { findMatchedCaptureGroup } from './findMatchedCaptureGroup'

const pattern = /^(?:ipfs:\/\/(?<ipfsCid>.*)|ar:\/\/(?<arweaveCid>.*))$/

export const resolveUri = ({
	src,
	ipfsGateway = 'https://ipfs.io/ipfs',
}: {
	src: string,
	ipfsGateway?: string,
}) => {
	if(!src) return undefined

	const [type, match] = findMatchedCaptureGroup<'ipfsCid' | 'arweaveCid'>(pattern, src)

	return type === 'ipfsCid' ?
		`${ipfsGateway}/${match}`
	:
		src
}
