import type { Ethereum } from '$/data/networks/types'

export async function getMetaMask(network: Ethereum.Network){
	const ethereum = globalThis.ethereum
	if(!ethereum?.isMetaMask)
		throw new Error('MetaMask is not available. Check your browser extension settings.')

	if(ethereum.chainId != network.chainId)
		throw new Error(`Please switch the network in MetaMask to "${network.name}" (chain ID ${network.chainId}).`)

	await ethereum.enable()

	return ethereum
}