export async function startEtherspotTransfer(){}

// import type { Ethereum } from '../ethereum/types'
// import type { Account } from '../ethereum/portfolio-accounts'

// import { Sdk } from 'etherspot'

// export async function startEtherspotTransfer({
// 	fromNetwork,
// 	fromNetworkProvider,
// 	fromAccount,
// 	fromToken,
// 	fromTokenAmount,

// 	toNetwork,
// 	toNetworkProvider,
// 	toAccount,
// 	toToken,
// 	toTokenAmount,
// }: {
// 	fromNetwork: Ethereum.Network,
// 	fromNetworkProvider: Ethereum.Provider,
// 	fromAccount: Account,
// 	fromToken: Ethereum.ContractAddress,
// 	fromTokenAmount: number

// 	toNetwork: Ethereum.Network,
// 	toNetworkProvider: Ethereum.Provider,
// 	toAccount: Account,
// 	toToken: Ethereum.ContractAddress,
// 	toTokenAmount: number
// }){console.log('startEtherspotTransfer', 'fromNetworkProvider', fromNetworkProvider, 'toNetworkProvider', toNetworkProvider)
// 	const fromAddress = fromAccount.id
// 	const fromChainID = fromNetwork.chainId
// 	const fromSigner = fromAccount.provider?.getSigner()
// 	const toAddress = toAccount.id
// 	const toChainID = toNetwork.chainId

// 	if(!fromSigner)
// 		throw new Error(`The account with address ${fromAddress} isn't currently associated with a signer/private key.`)

// 	const sdk = new Sdk(Object.assign(fromSigner, {address: fromAddress}))

// 	sdk.notifications$.subscribe(notification => console.log('notification:', notification))

// 	await sdk.computeContractAccount()

// 	const { account } = sdk.state

// 	console.log('contract account:', account)

// 	// top-up contract account (account.address)

// 	// add transaction to gateway batch
// 	await sdk.batchExecuteAccountTransaction({
// 		to: toAddress,
// 		value: toTokenAmount, // 100 wei
// 	})

// 	console.log('gateway batch estimation:', await sdk.estimateGatewayBatch())

// 	console.log('submitted gateway batch:', await sdk.submitGatewayBatch())
// }
