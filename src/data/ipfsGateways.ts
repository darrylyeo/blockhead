export enum IpfsGatewayProvider {
	IpfsIo = 'IpfsIo',
}

export type IpfsGatewayConfig = {
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

export const ipfsGatewaysByProvider: Record<IpfsGatewayProvider, IpfsGatewayConfig> = Object.fromEntries(
	ipfsGateways.map((ipfsGateway) => [ipfsGateway.gatewayProvider, ipfsGateway])
)
