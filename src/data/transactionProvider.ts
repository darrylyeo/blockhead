export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Covalent = 'Covalent',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
}


import { CovalentIcon, EtherspotIcon, MoralisIcon } from '../assets/icons'

export const transactionProviderIcons: Record<TransactionProvider, string> = {
	[TransactionProvider.Covalent]: CovalentIcon,
	[TransactionProvider.Etherspot]: EtherspotIcon,
	[TransactionProvider.Moralis]: MoralisIcon,
}
