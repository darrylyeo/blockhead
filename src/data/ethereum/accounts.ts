import type { CryptoAddress } from '../CryptoAddress'
import { localStorageWritable } from '../local-storage'
import { getProvider } from './provider'

export const getLocalAccounts = () =>
	localStorageWritable<CryptoAddress[]>('localAccounts', [])

export const getWeb3Accounts = async () => {
	const provider = await getProvider()
	
	// console.log('web3', web3, web3.eth.accounts)
	// You can now use a web3 method to obtain or send data. 
	// web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
	// 	console.log(balance, error);
	// })
	
	// console.log(provider, provider.isConnected())
	// const balance = await provider.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8")
	// console.log(balance)
	// console.log(ethers.utils.formatEther(balance))

	// console.log('balance', await provider.getBalance("ethers.eth"))
	// provider._getAddress('')

	const accounts = await provider.listAccounts()
	console.log('accounts', accounts)
	return accounts
}


// import { web3 } from './web3'

// // console.log(web3)
// // You can now use a web3 method to obtain or send data. 
// web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
//   console.log(balance);
// })


// if(globalThis.document) (async () => {
// 	const { web3 } = await import('./web3')
// 	console.log(web3)
	
// 	// You can now use a web3 method to obtain or send data. 
// 	web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
// 		console.log(balance);
// 	})
// })()