export enum NetworkProvider {
	Default = 'Default',
	Ethers = 'Ethers',
	Infura = 'Infura',
	Alchemy = 'Alchemy',
	PocketNetwork = 'PocketNetwork',
    Etherscan = 'Etherscan',
    Moralis = 'Moralis',
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
}
