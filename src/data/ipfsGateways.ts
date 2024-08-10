import type { DeepReadonly } from '$/utils/DeepReadonly'

export enum IpfsGatewayProvider {
	Helia = 'Helia',
	Lighthouse = 'Lighthouse',
	ProtocolLabsIpfsIo = 'IpfsIo',
	ProtocolLabsDweb = 'Dweb',
	Pinata = 'Pinata',
	NftStorage = 'NftStorage',
	Web3Storage = 'Web3Storage',
	Cloudflare = 'Cloudflare',
	InfuraEas = 'InfuraEas'
}

export type IpfsGatewayConfig = {
	gatewayProvider: IpfsGatewayProvider,
	name: string,
	icon?: string,
	colors?: string[],
	gatewayDomain?: string,
}

import { CloudflareIcon, EthereumAttestationServiceIcon, HeliaIcon, LighthouseIcon, PinataIcon, ProtocolLabsIcon } from '$/assets/icons'

export const ipfsGateways = [
	{
		gatewayProvider: IpfsGatewayProvider.Helia,
		name: 'Helia',
		icon: HeliaIcon,
		colors: ['#073A53', '#F7DF1E'],
		gatewayDomain: 'local'
	},
	{
		gatewayProvider: IpfsGatewayProvider.Lighthouse,
		name: 'Lighthouse',
		icon: LighthouseIcon,
		colors: ['#4a86d9', '#d53d6e'],
		gatewayDomain: 'gateway.lighthouse.storage',
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
		icon: CloudflareIcon,
		gatewayDomain: 'cloudflare-ipfs.com',
	},
	{
		gatewayProvider: IpfsGatewayProvider.InfuraEas,
		name: 'Infura › EAS',
		icon: EthereumAttestationServiceIcon,
		gatewayDomain: 'eas.infura-ipfs.io',
	},
] as const satisfies DeepReadonly<IpfsGatewayConfig[]>

export const ipfsGatewaysByProvider = Object.fromEntries(
	ipfsGateways.map((ipfsGateway) => [ipfsGateway.gatewayProvider, ipfsGateway])
) satisfies Record<IpfsGatewayProvider, IpfsGatewayConfig>
