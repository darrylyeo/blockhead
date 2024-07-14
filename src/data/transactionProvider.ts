export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	Etherscan = 'Etherscan',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
}


import { BlockscoutIcon, ChainbaseIcon, CovalentIcon, DecommasIcon, EtherscanIcon, EtherspotIcon, MoralisIcon } from '$/assets/icons'

export const transactionProviderIcons: Record<TransactionProvider, string> = {
	[TransactionProvider.Blockscout]: BlockscoutIcon,
	[TransactionProvider.Chainbase]: ChainbaseIcon,
	[TransactionProvider.Covalent]: CovalentIcon,
	[TransactionProvider.Decommas]: DecommasIcon,
	[TransactionProvider.Etherscan]: EtherscanIcon,
	[TransactionProvider.Etherspot]: EtherspotIcon,
	[TransactionProvider.Moralis]: MoralisIcon,
}
