import { writable } from 'svelte/store'
import { getProvider } from './provider'

export const accounts = writable([])

export const getAccounts = async () => {
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
	console.log(accounts)
}



// import { writable } from 'svelte/store'

// import { web3 } from './web3'
// export const accounts = writable([])

// // console.log(web3)
// // You can now use a web3 method to obtain or send data. 
// web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
//   console.log(balance);
// })



// import { writable } from 'svelte/store'

// export const accounts = writable([])

// console.log(9)
// if(globalThis.document) (async () => {
// 	const { web3 } = await import('./web3')
	
// 	console.log(web3)
// 	// You can now use a web3 method to obtain or send data. 
// 	web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
// 		console.log(balance);
// 	})
// })()