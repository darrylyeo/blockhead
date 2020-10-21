import type { Ethereum } from '../types'
import { PORTIS_DAPP_ID } from '../../../config'

export async function getPortisProvider(network: Ethereum.Network = 'mainnet'){
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
    const portis = new Portis(PORTIS_DAPP_ID, network)

    return portis.provider
}