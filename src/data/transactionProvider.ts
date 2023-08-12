export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Covalent = 'Covalent',
	Etherscan = 'Etherscan',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
}


import { CovalentIcon, EtherscanIcon, EtherspotIcon, MoralisIcon } from '../assets/icons'

export const transactionProviderIcons: Record<TransactionProvider, string> = {
	[TransactionProvider.Covalent]: CovalentIcon,
	[TransactionProvider.Etherscan]: EtherscanIcon,
	[TransactionProvider.Etherspot]: EtherspotIcon,
	[TransactionProvider.Moralis]: MoralisIcon,
}
