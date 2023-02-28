import { Sdk, randomPrivateKey, NetworkNames } from 'etherspot'
import { memoized } from '../utils/memoized'
import type { Ethereum } from '../data/networks/types'


const CHAIN_ID_TO_NETWORK_NAME: Record<Ethereum.ChainID, NetworkNames> = {
	1: NetworkNames.Mainnet,
	3: NetworkNames.Ropsten,
	4: NetworkNames.Rinkeby,
	5: NetworkNames.Goerli,
	42: NetworkNames.Kovan,
	100: NetworkNames.Xdai,
	77: NetworkNames.Sokol,
	56: NetworkNames.Bsc,
	97: NetworkNames.BscTest,
	250: NetworkNames.Fantom,
	4002: NetworkNames.FantomTest,
	137: NetworkNames.Matic,
	80001: NetworkNames.Mumbai,
	4386: NetworkNames.Etherspot,
	9999: NetworkNames.LocalA,
	6666: NetworkNames.LocalB,
	3333: NetworkNames.LocalH,
}


export const getEtherspotInstance = memoized(({
	network
}: {
	network: Ethereum.Network
}) => (
	new Sdk({
		privateKey: randomPrivateKey(),
	}, {
		networkName: CHAIN_ID_TO_NETWORK_NAME[network.chainId]
	})
))


export const getTransaction = async ({
	network,
	etherspotSdk = getEtherspotInstance({ network }),
	transactionID
}: {
	network: Ethereum.Network,
	etherspotSdk?: Sdk,
	transactionID: Ethereum.TransactionID
} | {
	network?: Ethereum.Network,
	etherspotSdk: Sdk,
	transactionID: Ethereum.TransactionID
}) =>
	await etherspotSdk.getTransaction({
		hash: transactionID
	})


export const getTransactions = async ({
	network,
	address,
	etherspotSdk = getEtherspotInstance({network})
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
	etherspotSdk?: Sdk
} | {
	network?: Ethereum.Network,
	address: Ethereum.Address,
	etherspotSdk: Sdk
}) => {
	try {
		const { items } = await etherspotSdk.getTransactions({
			account: address
		})
		return items
	}catch(e){
		throw e?.errors?.map(e => e?.constraints?.type).join('\n') ?? e
	}
}



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
