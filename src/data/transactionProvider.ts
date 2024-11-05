export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	Etherscan = 'Etherscan',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
	Noves = 'Noves',
}


import { BlockscoutIcon, ChainbaseIcon, CovalentGoldRushIcon, DecommasIcon, EtherscanIcon, EtherspotIcon, MoralisIcon, NovesIcon } from '$/assets/icons'

export const transactionProviderIcons: Record<TransactionProvider, string> = {
	[TransactionProvider.Blockscout]: BlockscoutIcon,
	[TransactionProvider.Chainbase]: ChainbaseIcon,
	[TransactionProvider.Covalent]: CovalentGoldRushIcon,
	[TransactionProvider.Decommas]: DecommasIcon,
	[TransactionProvider.Etherscan]: EtherscanIcon,
	[TransactionProvider.Etherspot]: EtherspotIcon,
	[TransactionProvider.Moralis]: MoralisIcon,
	[TransactionProvider.Noves]: NovesIcon,
}
