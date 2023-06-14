export enum IpfsGatewayProvider {
	IpfsIo = 'IpfsIo',
}

type IpfsGatewayConfig = {
	gatewayProvider: IpfsGatewayProvider,
	name: string,
	icon?: string,
	gatewayDomain: string,
}

import { IpfsIcon } from '../assets/icons'

export const ipfsGateways: IpfsGatewayConfig[] = [
	{
		gatewayProvider: IpfsGatewayProvider.IpfsIo,
		name: 'ipfs.io',
		icon: IpfsIcon,
		gatewayDomain: 'ipfs.io'
	},
]
