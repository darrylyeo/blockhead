import CeramicClient from '@ceramicnetwork/http-client'

type CeramicNode = {
	id: string,
	url: string,
	network: CeramicNetwork,
	hasReadAccess: boolean,
	hasWriteAccess: boolean,
}

enum CeramicNetwork {
	Mainnet = 'mainnet',
	ClayTestnet = 'clay-testnet',
}

// https://developers.ceramic.network/run/nodes/community-nodes/
// https://developers.ceramic.network/tools/self-id/configuration/
const ceramicNodes: CeramicNode[] = [
	{
		id: 'mainnet-gateway',
		url: 'https://gateway.ceramic.network',
		network: CeramicNetwork.Mainnet,
		hasReadAccess: true,
		hasWriteAccess: false,
	},
	{
		id: 'testnet-clay',
		url: 'https://gateway-clay.ceramic.network',
		network: CeramicNetwork.ClayTestnet,
		hasReadAccess: true,
		hasWriteAccess: false,
	},
	{
		id: 'testnet-clay-gateway',
		url: 'https://ceramic-clay.3boxlabs.com',
		network: CeramicNetwork.ClayTestnet,
		hasReadAccess: true,
		hasWriteAccess: true,
	},
]

export const getCeramicClient = (ceramicNode = ceramicNodes.find(node => node.hasWriteAccess)) => (
	new CeramicClient(ceramicNode.url)
)
