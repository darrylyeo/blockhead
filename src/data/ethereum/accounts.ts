import { writable } from 'svelte/store'
import { getWeb3 } from './web3'

export const accounts = writable([])

export const getAccounts = async () => {
	const { web3 } = await getWeb3()
	
	console.log('web3', web3, web3.eth.accounts)
	// You can now use a web3 method to obtain or send data. 
	web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
		console.log(balance, error);
	})
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