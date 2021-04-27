import type { Ethereum } from '../types'
import { evmNetworkByID } from '../types'

export async function getMetaMask(network: Ethereum.NetworkName){
    const ethereum = globalThis.ethereum

    if(!ethereum?.isMetaMask)
        throw new Error('MetaMask is not available. Check your browser extension settings.')

    if(evmNetworkByID[Number(ethereum.chainId)] !== network)
        throw new Error(`Please switch the network in MetaMask to "${network}".`)

    return ethereum
}