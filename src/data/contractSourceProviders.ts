export enum ContractSourceProvider {
	Blockscout = 'Blockscout',
	Curvegrid_Multibaas = 'Curvegrid › MultiBaas',
	Etherscan = 'Etherscan',
	Sourcify = 'Sourcify',
	// Tenderly = 'Tenderly',
}


import { BlockscoutIcon, EtherscanIcon, SourcifyIcon, CurvegridIcon /*, TenderlyIcon */ } from '$/assets/icons'

export const contractSourceProviders = {
	[ContractSourceProvider.Blockscout]: {
		name: 'Blockscout',
		icon: BlockscoutIcon,
	},
	[ContractSourceProvider.Curvegrid_Multibaas]: {
		name: 'Curvegrid › MultiBaas',
		icon: CurvegridIcon,
	},
	[ContractSourceProvider.Etherscan]: {
		name: 'Etherscan',
		icon: EtherscanIcon,
	},
	[ContractSourceProvider.Sourcify]: {
		name: 'Sourcify',
		icon: SourcifyIcon,
	},
	// [ContractSourceProvider.Tenderly]: {
	// 	name: 'Tenderly',
	// 	icon: TenderlyIcon,
	// },
} as const satisfies Record<ContractSourceProvider, {
	name: string
	icon: string
}>
