import type { Ethereum } from '../ethereum/types'


export namespace Connext {
	export interface ConnextSwap {
		"fromChainId": Ethereum.ChainID,
		"toChainId": Ethereum.ChainID,
		"fromAssetId": Ethereum.ContractAddress,
		"toAssetId": Ethereum.ContractAddress,
		"priceType": "hardcoded",
		"hardcodedRate"?: number | string
	}


	export const mainnetPublicIdentifier = 'vector892GMZ3CuUkpyW8eeXfW2bt5W73TWEXtgV71nphXUXAmpncnj8'

	export const mainnetSignerAddress: Ethereum.ContractAddress = '0xE540998865aFEB054021dc849Cc6191b8E09dC08'

	export const mainnetSwaps: ConnextSwap[] = [
		{
			"fromChainId": 1,
			"toChainId": 137,
			"fromAssetId": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			"toAssetId": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 1,
			"fromAssetId": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
			"toAssetId": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 137,
			"fromAssetId": "0x55d398326f99059ff775485246999027b3197955",
			"toAssetId": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 56,
			"fromAssetId": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
			"toAssetId": "0x55d398326f99059ff775485246999027b3197955",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 100,
			"fromAssetId": "0x55d398326f99059ff775485246999027b3197955",
			"toAssetId": "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 56,
			"fromAssetId": "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
			"toAssetId": "0x55d398326f99059ff775485246999027b3197955",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 137,
			"fromAssetId": "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
			"toAssetId": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 100,
			"fromAssetId": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
			"toAssetId": "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 1,
			"toChainId": 100,
			"fromAssetId": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 1,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 137,
			"fromAssetId": "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
			"toAssetId": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 56,
			"fromAssetId": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
			"toAssetId": "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 100,
			"fromAssetId": "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
			"toAssetId": "0x4537e328bf7e4efa29d05caea260d7fe26af9d74",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 56,
			"fromAssetId": "0x4537e328bf7e4efa29d05caea260d7fe26af9d74",
			"toAssetId": "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 137,
			"fromAssetId": "0x4537e328bf7e4efa29d05caea260d7fe26af9d74",
			"toAssetId": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 100,
			"fromAssetId": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
			"toAssetId": "0x4537e328bf7e4efa29d05caea260d7fe26af9d74",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 137,
			"fromAssetId": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			"toAssetId": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 56,
			"fromAssetId": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
			"toAssetId": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 100,
			"fromAssetId": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			"toAssetId": "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 56,
			"fromAssetId": "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
			"toAssetId": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 137,
			"fromAssetId": "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
			"toAssetId": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 100,
			"fromAssetId": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
			"toAssetId": "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 137,
			"fromAssetId": "0x44fA8E6f47987339850636F88629646662444217",
			"toAssetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 100,
			"fromAssetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			"toAssetId": "0x44fA8E6f47987339850636F88629646662444217",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 100,
			"fromAssetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 137,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 1,
			"toChainId": 137,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 100,
			"toChainId": 56,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 100,
			"fromAssetId": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 56,
			"toChainId": 137,
			"fromAssetId": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
			"toAssetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 56,
			"fromAssetId": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			"toAssetId": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		}
	]


	// https://docs.connext.network/connext-testnet

	export const testnetPublicIdentifier = 'vector7tbbTxQp8ppEQUgPsbGiTrVdapLdU5dH7zTbVuXRf1M4CEBU9Q'

	export const testnetSignerAddress: Ethereum.ContractAddress = '0x3b66Db1b41B37510851cB03eC0Be3377DcE3f422'

	export const testnetSwaps: ConnextSwap[] = [
		{
			"fromChainId": 4,
			"toChainId": 42,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 42,
			"toChainId": 4,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 80001,
			"toChainId": 5,
			"fromAssetId": "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
			"toAssetId": "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 5,
			"toChainId": 80001,
			"fromAssetId": "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa",
			"toAssetId": "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 1,
			"toChainId": 137,
			"fromAssetId": "0x9E86dd60e0B1e7e142F033d1BdEf734c6b3224Bb",
			"toAssetId": "0x9E86dd60e0B1e7e142F033d1BdEf734c6b3224Bb",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 137,
			"toChainId": 1,
			"fromAssetId": "0x9E86dd60e0B1e7e142F033d1BdEf734c6b3224Bb",
			"toAssetId": "0x9E86dd60e0B1e7e142F033d1BdEf734c6b3224Bb",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 42,
			"toChainId": 79377087078960,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		},
		{
			"fromChainId": 79377087078960,
			"toChainId": 42,
			"fromAssetId": "0x0000000000000000000000000000000000000000",
			"toAssetId": "0x0000000000000000000000000000000000000000",
			"priceType": "hardcoded",
			"hardcodedRate": "1"
		}
	]
}