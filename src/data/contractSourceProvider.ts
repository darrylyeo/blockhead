export enum ContractSourceProvider {
	Blockscout = 'Blockscout',
	Etherscan = 'Etherscan',
	Sourcify = 'Sourcify',
	// Tenderly = 'Tenderly',
}


import { BlockscoutIcon, EtherscanIcon, SourcifyIcon /*, TenderlyIcon */ } from '$/assets/icons'

export const contractSourceProviderIcons: Record<ContractSourceProvider, string> = {
	[ContractSourceProvider.Blockscout]: BlockscoutIcon,
	[ContractSourceProvider.Etherscan]: EtherscanIcon,
	[ContractSourceProvider.Sourcify]: SourcifyIcon,
	// [ContractSourceProvider.Tenderly]: TenderlyIcon,
}
