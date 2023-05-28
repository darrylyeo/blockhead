export enum NetworkProvider {
	Default = 'Default',
	Ethers = 'Ethers',
	Infura = 'Infura',
	Alchemy = 'Alchemy',
	PocketNetwork = 'Pocket Network',
	Figment = 'Figment',
	Etherscan = 'Etherscan',
	Moralis = 'Moralis',
	QuickNode = 'QuickNode',
	Tenderly = 'Tenderly',
	GatewayFm = 'Gateway.fm',
}

export enum NetworkProviderConnectionType {
	RPC = 'RPC',
	JSONRPC = 'JSONRPC',
	WebSocket = 'WebSocket'
}

export enum NetworkProviderNodeType {
	Default = 'Default',
	Indexer = 'Indexer',
	Archive = 'Archive',
	Full = 'Full',
	Trace = 'Trace',
}
