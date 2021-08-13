import Ceramic from '@ceramicnetwork/http-client'

const CERAMIC_TESTNET_NODES = ['https://gateway-clay.ceramic.network', 'https://ceramic-clay.3boxlabs.com']


export function getCeramic(apiHost = CERAMIC_TESTNET_NODES[0]) {
	const ceramic = new Ceramic(apiHost)
	return ceramic
}