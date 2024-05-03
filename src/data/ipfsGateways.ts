import type { DeepReadonly } from '$/utils/DeepReadonly'

export enum IpfsGatewayProvider {
	Helia = 'Helia',
	ProtocolLabsIpfsIo = 'IpfsIo',
	ProtocolLabsDweb = 'Dweb',
	Pinata = 'Pinata',
	NftStorage = 'NftStorage',
	Web3Storage = 'Web3Storage',
	Cloudflare = 'Cloudflare',
}

export type IpfsGatewayConfig = {
	gatewayProvider: IpfsGatewayProvider,
	name: string,
	icon?: string,
	colors?: string[],
	gatewayDomain?: string,
}

import { HeliaIcon, PinataIcon, ProtocolLabsIcon } from '$/assets/icons'

export const ipfsGateways = [
	{
		gatewayProvider: IpfsGatewayProvider.Helia,
		name: 'Helia',
		icon: HeliaIcon,
		colors: ['#073A53', '#F7DF1E'],
		gatewayDomain: 'local'
	},
	{
		gatewayProvider: IpfsGatewayProvider.ProtocolLabsIpfsIo,
		name: 'Protocol Labs',
		icon: ProtocolLabsIcon,
		colors: ['#469ea2', '#6acad1', '#083b54'],
		gatewayDomain: 'ipfs.io'
	},
	{
		gatewayProvider: IpfsGatewayProvider.ProtocolLabsDweb,
		name: 'Protocol Labs',
		icon: ProtocolLabsIcon,
		colors: ['#469ea2', '#6acad1', '#083b54'],
		gatewayDomain: 'dweb.link'
	},
	{
		gatewayProvider: IpfsGatewayProvider.NftStorage,
		name: 'NFT.Storage',
		gatewayDomain: 'nftstorage.link'
	},
	{
		gatewayProvider: IpfsGatewayProvider.Web3Storage,
		name: 'Web3.Storage',
		gatewayDomain: 'w3s.link'
	},
	{
		gatewayProvider: IpfsGatewayProvider.Pinata,
		name: 'Pinata',
		icon: PinataIcon,
		gatewayDomain: 'gateway.pinata.cloud'
	},
	{
		gatewayProvider: IpfsGatewayProvider.Cloudflare,
		name: 'Cloudflare',
		gatewayDomain: 'cloudflare-ipfs.com',
	},
] as const satisfies DeepReadonly<IpfsGatewayConfig[]>

export const ipfsGatewaysByProvider = Object.fromEntries(
	ipfsGateways.map((ipfsGateway) => [ipfsGateway.gatewayProvider, ipfsGateway])
) satisfies Record<IpfsGatewayProvider, IpfsGatewayConfig>
