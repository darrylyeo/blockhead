import { PORTIS_DAPP_ID } from '../../config'

let portis
let web3

export const getWeb3 = async () => {
	if(!web3){
		const Portis = (await import('@portis/web3')).default
		const Web3 = (await import('web3')).default
		portis = new Portis(PORTIS_DAPP_ID, 'mainnet')
		web3 = new Web3(portis.provider)
	}
	return { portis, web3 }
}



// import Portis from '@portis/web3'
// import Web3 from 'web3'

// import { PORTIS_DAPP_ID } from '../../config'

// /*
//    Initialize Portis by declaring:
//      - Required:
//        - dappId: Your Portis DApp identification. You can register at 
//       (https://dashboard.portis.io/register)
//        - network: The network you are trying to connect to. this can be a 
//        single string(shown below) or an object.
//      - Optional:
//        - config: you can customize you configuration by adding an one of 
//        the following as an object.
//        learn more(https://docs.portis.io/#/configuration?id=options):
//         - pocketDevId
//         - gasRelay
//         - registerPageByDefault
// */
// const portis = new Portis(PORTIS_DAPP_ID, 'mainnet')
// export const web3 = new Web3(portis.provider)



// import { PORTIS_DAPP_ID } from '../../config'

// export let portis
// export let web3

// if(globalThis.document) (async () => {
// 	const Portis = (await import('@portis/web3')).default
// 	const Web3 = (await import('web3')).default
// 	portis = new Portis(PORTIS_DAPP_ID, 'mainnet')
// 	web3 = new Web3(portis.provider)
// })()