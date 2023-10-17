export const caip2NamespaceForBlockchain = {
	'Ethereum': 'eip155',
	'Cosmos': 'cosmos',
	'Filecoin': 'fil',
	'EOS': 'eosio',
	'Polkadot': 'polkadot'
} as const;

export type BlockchainName = keyof typeof caip2NamespaceForBlockchain;

export type Caip2Namespace = (typeof caip2NamespaceForBlockchain)[keyof typeof caip2NamespaceForBlockchain];
