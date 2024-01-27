export enum ContractSourceProvider {
	Etherscan = 'Etherscan',
    Sourcify = 'Sourcify',
	// Tenderly = 'Tenderly',
}


import { EtherscanIcon, SourcifyIcon /*, TenderlyIcon */ } from '$/assets/icons'

export const contractSourceProviderIcons: Record<ContractSourceProvider, string> = {
	[ContractSourceProvider.Etherscan]: EtherscanIcon,
	[ContractSourceProvider.Sourcify]: SourcifyIcon,
	// [ContractSourceProvider.Tenderly]: TenderlyIcon,
}
