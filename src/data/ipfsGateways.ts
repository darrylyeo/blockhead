export enum IpfsGatewayProvider {
	Helia = 'Helia',
	IpfsIo = 'IpfsIo',
}

export type IpfsGatewayConfig = {
	gatewayProvider: IpfsGatewayProvider,
	name: string,
	icon?: string,
	colors?: string[],
	gatewayDomain?: string,
}

import { HeliaIcon, IpfsIcon } from '../assets/icons'

export const ipfsGateways: IpfsGatewayConfig[] = [
	{
		gatewayProvider: IpfsGatewayProvider.Helia,
		name: 'Helia',
		icon: HeliaIcon,
		colors: ['#073A53', '#F7DF1E'],
		gatewayDomain: 'local'
	},
	{
		gatewayProvider: IpfsGatewayProvider.IpfsIo,
		name: 'ipfs.io',
		icon: IpfsIcon,
		colors: ['#469ea2', '#6acad1', '#083b54'],
		gatewayDomain: 'ipfs.io'
	},
]

export const ipfsGatewaysByProvider: Record<IpfsGatewayProvider, IpfsGatewayConfig> = Object.fromEntries(
	ipfsGateways.map((ipfsGateway) => [ipfsGateway.gatewayProvider, ipfsGateway])
)
