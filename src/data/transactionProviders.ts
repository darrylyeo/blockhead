export enum TransactionProvider {
	RpcProvider = 'RPC Provider',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Curvegrid_Multibaas = 'Curvegrid › MultiBaas',
	Decommas = 'Decommas',
	Envio_Hypersync = 'Envio_Hypersync',
	Etherscan = 'Etherscan',
	Etherspot = 'Etherspot',
	Moralis = 'Moralis',
	Noves = 'Noves',
}


import { BlockscoutIcon, ChainbaseIcon, CovalentGoldRushIcon, CurvegridIcon, DecommasIcon, EnvioIcon, EtherscanIcon, EtherspotIcon, MoralisIcon, NovesIcon } from '$/assets/icons'

export const transactionProviders = {
	[TransactionProvider.RpcProvider]: {
		name: 'RPC Provider',
	},
	[TransactionProvider.Blockscout]: {
		name: 'Blockscout',
		icon: BlockscoutIcon,
	},
	[TransactionProvider.Chainbase]: {
		name: 'Chainbase',
		icon: ChainbaseIcon,
	},
	[TransactionProvider.Covalent]: {
		name: 'Covalent',
		icon: CovalentGoldRushIcon,
	},
	[TransactionProvider.Curvegrid_Multibaas]: {
		name: 'Curvegrid › MultiBaas',
		icon: CurvegridIcon,
	},
	[TransactionProvider.Decommas]: {
		name: 'Decommas',
		icon: DecommasIcon,
	},
	[TransactionProvider.Envio_Hypersync]: {
		name: 'Envio › HyperSync',
		icon: EnvioIcon,
	},
	[TransactionProvider.Etherscan]: {
		name: 'Etherscan',
		icon: EtherscanIcon,
	},
	[TransactionProvider.Etherspot]: {
		name: 'Etherspot',
		icon: EtherspotIcon,
	},
	[TransactionProvider.Moralis]: {
		name: 'Moralis',
		icon: MoralisIcon,
	},
	[TransactionProvider.Noves]: {
		name: 'Noves',
		icon: NovesIcon,
	},
} as const satisfies Record<TransactionProvider, {
	name: string
	icon?: string
}>
