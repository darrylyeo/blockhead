import { PORTIS_DAPP_ID } from '../../config'
import type { EthereumNetwork } from './network'
import type { Web3Provider } from '@ethersproject/providers'

export type EthereumProvider = Web3Provider

let ethers
let Web3
let Portis

const providers: Partial<Record<EthereumNetwork, EthereumProvider>> = {}

export async function getEthersJS(){
	if(!ethers)
		ethers = (await import('ethers')).default
	return ethers
}

export async function getPortis(){
	if(!Portis)
		Portis = (await import('@portis/web3')).default
	return Portis
}

// export async function getWeb3(){
// 	if(!Web3)
// 		Web3 = (await import('web3')).default
// 	return Web3
// }

export async function getProvider(network: EthereumNetwork = 'mainnet'){
	const ethers = await getEthersJS()
	const Portis = await getPortis()
	// const Web3 = await getWeb3()

	if(!(network in providers)){
		/*
		Initialize Portis by declaring:
		- Required:
			- dappId: Your Portis DApp identification. You can register at 
		(https://dashboard.portis.io/register)
			- network: The network you are trying to connect to. this can be a 
			single string(shown below) or an object.
		- Optional:
			- config: you can customize you configuration by adding an one of 
			the following as an object.
			learn more(https://docs.portis.io/#/configuration?id=options):
			- pocketDevId
			- gasRelay
			- registerPageByDefault
		*/
		const portis = new Portis(PORTIS_DAPP_ID, network)
		providers[network] = new ethers.providers.Web3Provider(portis.provider)
		// providers[network] = new Web3(portis.provider)
	}

	return providers[network]
}