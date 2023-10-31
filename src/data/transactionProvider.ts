export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Beryx = 'Beryx',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Etherscan = 'Etherscan',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
}


import { BeryxIcon, ChainbaseIcon, CovalentIcon, EtherscanIcon, EtherspotIcon, MoralisIcon } from '../assets/icons'

export const transactionProviderIcons: Record<TransactionProvider, string> = {
	[TransactionProvider.Beryx]: BeryxIcon,
	[TransactionProvider.Chainbase]: ChainbaseIcon,
	[TransactionProvider.Covalent]: CovalentIcon,
	[TransactionProvider.Etherscan]: EtherscanIcon,
	[TransactionProvider.Etherspot]: EtherspotIcon,
	[TransactionProvider.Moralis]: MoralisIcon,
}
