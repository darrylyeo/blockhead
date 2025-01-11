export enum ContractSourceProvider {
	Blockscout = 'Blockscout',
	Curvegrid_Multibaas = 'Curvegrid › MultiBaas',
	Etherscan = 'Etherscan',
	Sourcify = 'Sourcify',
	// Tenderly = 'Tenderly',
}


import { BlockscoutIcon, EtherscanIcon, SourcifyIcon, CurvegridIcon /*, TenderlyIcon */ } from '$/assets/icons'

export const contractSourceProviderIcons: Record<ContractSourceProvider, string> = {
	[ContractSourceProvider.Blockscout]: BlockscoutIcon,
	[ContractSourceProvider.Curvegrid_Multibaas]: CurvegridIcon,
	[ContractSourceProvider.Etherscan]: EtherscanIcon,
	[ContractSourceProvider.Sourcify]: SourcifyIcon,
	// [ContractSourceProvider.Tenderly]: TenderlyIcon,
}
