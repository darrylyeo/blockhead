export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Beryx = 'Beryx',
	Covalent = 'Covalent',
	Etherscan = 'Etherscan',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
}


import { BeryxIcon, CovalentIcon, EtherscanIcon, EtherspotIcon, MoralisIcon } from '../assets/icons'

export const transactionProviderIcons: Record<TransactionProvider, string> = {
	[TransactionProvider.Beryx]: BeryxIcon,
	[TransactionProvider.Covalent]: CovalentIcon,
	[TransactionProvider.Etherscan]: EtherscanIcon,
	[TransactionProvider.Etherspot]: EtherspotIcon,
	[TransactionProvider.Moralis]: MoralisIcon,
}
