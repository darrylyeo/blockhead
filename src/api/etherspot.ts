import { Sdk, randomPrivateKey, NetworkNames, Transaction as EtherspotTransaction, TransactionLog, TransactionStatuses, TransactionAssetCategories } from 'etherspot'
import { memoized } from '$/utils/memoized'
import type { Ethereum } from '$/data/networks/types'
import type { AbiType } from 'abitype'


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


type Transaction = Ethereum.Transaction & {
	cumulativeGasSpent: EtherspotTransaction['cumulativeGasUsed'],
	inputData: EtherspotTransaction['input'],
	transferredToken?: Ethereum.ERC20Token
}

export const normalizeTransaction = (transaction: EtherspotTransaction, network: Ethereum.Network): Transaction => ({
	network,

	transactionID: transaction.hash,
	nonce: transaction.nonce,
	transactionIndex: transaction.transactionIndex,
	blockNumber: BigInt(transaction.blockNumber),
	blockHash: transaction.blockHash as Ethereum.BlockHash,
	blockTimestamp: transaction.timestamp,

	isSuccessful: transaction.status === TransactionStatuses.Completed,

	fromAddress: transaction.from as Ethereum.Address,
	toAddress: transaction.to as Ethereum.Address,

	value: BigInt(transaction.value),
	
	gasToken: network.nativeCurrency,
	gasOffered: transaction.gasLimit,
	gasSpent: transaction.gasUsed * 0.1 ** network.nativeCurrency.decimals,
	gasRate: transaction.gasPrice,
	gasValue: BigInt(transaction.gasPrice * transaction.gasUsed),
	
	logEvents: transaction.logs.map(normalizeLogEvent),

	input: transaction.input as Ethereum.TransactionInput,

	transferredToken: transaction.asset?.category === TransactionAssetCategories.Token ? {
		name: transaction.asset.name,
		decimals: transaction.asset.decimal,
		address: transaction.asset.contract as Ethereum.ContractAddress,
	} : undefined
})


export const normalizeLogEvent = (logEvent: TransactionLog): Ethereum.TransactionLogEvent => ({

	topics: logEvent.topics as Ethereum.TopicHash[],
	data: logEvent.data,

	contract: {
		address: logEvent.address as Ethereum.ContractAddress,
	},

	...logEvent.decoded && {
		decoded: {
			name: logEvent.decoded.name,
			signature: logEvent.decoded.signature,
			params: logEvent.decoded.params.map(param => ({
				name: param.name,
				type: param.type as AbiType,
				value: param.value
			})),
		},
	},
})


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
// 	fromNetworkProvider: Ethereum.PublicClient,
// 	fromAccount: Account,
// 	fromToken: Ethereum.ContractAddress,
// 	fromTokenAmount: number

// 	toNetwork: Ethereum.Network,
// 	toNetworkProvider: Ethereum.PublicClient,
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
