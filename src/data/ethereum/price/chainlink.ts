import type { Ethereum } from '../types'
import { getEthersJS } from '../ethers'
import { getWeb3 } from '../web3'

type AssetPair = string

// https://docs.chain.link/docs/reference-contracts
const CHAINLINK_CONTRACTS: Partial<Record<Ethereum.Network, Record<AssetPair, Ethereum.Address>>> = {
	mainnet: {
		'BTC/ETH': '0xdeb288F737066589598e9214E782fa5A8eD689e8',
		'BTC/USD': '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
		'DAI/ETH': '0x773616E4d11A78F511299002da57A0a94577F1f4',
		'DAI/USD': '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
		'ETH/USD': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
		'USDC/ETH': '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46',
		'USDT/ETH': '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46',
	},
	kovan: {
		'BTC/ETH': '0xF4eE06480Cf3399D885639157A5a8CdE21F6934A',
		'BTC/USD': '0x6135b13325bfC4B00278B4abC5e20bbce2D6580e',
		'DAI/ETH': '0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541',
		'DAI/USD': '0x777A68032a88E5A84678A77Af2CD65A7b3c0775a',
		'ETH/USD': '0x9326BFA02ADD2366b30bacB125260Af641031331',
		'USDC/ETH': '0x64EaC61A2DFda2c3Fa04eED49AA33D021AeC8838',
		'USDT/ETH': '0x0bF499444525a23E7Bb61997539725cA2e928138',
	},
	rinkeby: {
		'BTC/USD': '0xECe365B379E1dD183B20fc5f022230C044d51404',
		'DAI/USD': '0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF',
		'ETH/USD': '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
		'USDC/USD': '0xa24de01df22b63d23Ebc1882a5E3d4ec0d907bFB'
	}
}

// https://docs.chain.link/docs/get-the-latest-price
const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

// let validId = BigInt("18446744073709562301")
// return await priceFeed.methods.getRoundData(validId).call()

export const getChainlinkPriceFeed = async (provider: Ethereum.Provider, network: Ethereum.Network = 'mainnet', quoteAsset = 'ETH', baseAsset = 'USD') => {
	// const web3 = await getWeb3()
	// const assetPair: AssetPair = `${quoteAsset}/${baseAsset}`
	// const priceFeedContract = new web3.eth.Contract(aggregatorV3InterfaceABI, CHAINLINK_CONTRACTS[network][assetPair])
	// return await priceFeedContract.methods.latestRoundData().call()

	const ethers = await getEthersJS()
	const assetPair: AssetPair = `${quoteAsset}/${baseAsset}`
	const contractAddress = CHAINLINK_CONTRACTS[network][assetPair]
	const priceFeedContract = new ethers.Contract(aggregatorV3InterfaceABI, contractAddress).connect(provider)
	console.log(priceFeedContract)
	return await priceFeedContract.methods.latestRoundData().call()
}