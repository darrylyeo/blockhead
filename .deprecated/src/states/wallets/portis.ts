import type { Ethereum } from '$/data/networks/types'
import { getNetworkRPC } from '$/data/networks'


const PORTIS_DAPP_ID = '136f70ac-f0e2-4f6f-b83b-a1089ec331bb'


export async function getPortis(network: Ethereum.Network){
	const Portis = (await import('@portis/web3')).default

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
	return new Portis(PORTIS_DAPP_ID, portisNetworkNames[network.chainId] ?? {
		nodeUrl: getNetworkRPC(network),
		chainId: String(network.chainId),
		// gasRelayHubAddress
	})
}

const portisNetworkNames: Record<Ethereum.ChainID, string> = {
	1: 'mainnet',
	3: 'ropsten',
	4: 'rinkeby',
	5: 'goerli',
	8: 'ubiq',
	18: 'thundercoreTestnet',
	// 'orchid',
	// 'orchidTestnet',
	42: 'kovan',
	61: 'classic',
	77: 'sokol',
	99: 'core',
	100: 'xdai',
	108: 'thundercore',
	122: 'fuse',
	163: 'lightstreams',
	137: 'matic',
	80001: 'maticMumbai',
	// 'maticAlpha',
	// 'maticTestnet',
}