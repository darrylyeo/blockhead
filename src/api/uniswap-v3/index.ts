import type { Ethereum } from '../../data/networks/types'

import {
	type Token,
	type SupportedChainsType,
	SUPPORTED_CHAINS,
} from '@uniswap/sdk-core'

import { FeeAmount, computePoolAddress } from '@uniswap/v3-sdk'
import IUniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'


import { memoized } from '../../utils/memoized'


export namespace UniswapV3 {
	export type ChainId = SupportedChainsType | 100

	export const SUPPORTED_CHAIN_IDS = [...SUPPORTED_CHAINS, 100]

	export type Pool = {
		token0: Ethereum.ERC20Token,
		token1: Ethereum.ERC20Token,
		fee: FeeAmount,
	}
	export type DeployedPool = Pool & {
		contract: Ethereum.Contract,
	}

	// https://docs.uniswap.org/contracts/v3/reference/deployments
	export const deployedContractsByChainId = Object.fromEntries(
		([
			{
				chainIds: [1, 5, 42161, 10, 137],
				contractAddresses: {
					UniswapV3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
					Multicall2: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
					ProxyAdmin: '0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2',
					TickLens: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
					Quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
					SwapRouter: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
					NFTDescriptor: '0x42B24A95702b9986e82d421cC3568932790A48Ec',
					NonfungibleTokenPositionDescriptor: '0x91ae842A5Ffd8d12023116943e72A606179294f3',
					TransparentUpgradeableProxy: '0xEe6A57eC80ea46401049E92587E52f5Ec1c24785',
					NonfungiblePositionManager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
					V3Migrator: '0xA5644E29708357803b5A882D272c41cC0dF92B34',
					QuoterV2: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
					SwapRouter02: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
					Permit2: '0x000000000022d473030f116ddee9f6b43ac78ba3',
					UniversalRouter: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
				},
			},
			{
				chainIds: [42220],
				contractAddresses: {
					UniswapV3Factory: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
					Multicall2: '0x633987602DE5C4F337e3DbF265303A1080324204',
					ProxyAdmin: '0xc1b262Dd7643D4B7cA9e51631bBd900a564BF49A',
					TickLens: '0x5f115D9113F88e0a0Db1b5033D90D4a9690AcD3D',
					Quoter: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
					SwapRouter: '0x5615CDAb10dc425a742d643d949a7F474C01abc4',
					NFTDescriptor: '0xa9Fd765d85938D278cb0b108DbE4BF7186831186',
					NonfungibleTokenPositionDescriptor: '0x644023b316bB65175C347DE903B60a756F6dd554',
					TransparentUpgradeableProxy: '0x505B43c452AA4443e0a6B84bb37771494633Fde9',
					NonfungiblePositionManager: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
					V3Migrator: '0x3cFd4d48EDfDCC53D3f173F596f621064614C582',
					QuoterV2: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
					SwapRouter02: '0x5615CDAb10dc425a742d643d949a7F474C01abc4',
					Permit2: '0x000000000022d473030f116ddee9f6b43ac78ba3',
					UniversalRouter: '0x5Dc88340E1c5c6366864Ee415d6034cadd1A9897',
				},
			},
			{
				chainIds: [56],
				contractAddresses: {
					UniswapV3Factory: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
					Multicall2: '0x963Df249eD09c358A4819E39d9Cd5736c3087184',
					ProxyAdmin: '0xC9A7f5b73E853664044ab31936D0E6583d8b1c79',
					TickLens: '0xD9270014D396281579760619CCf4c3af0501A47C',
					// Quoter: '',
					// SwapRouter: '',
					NFTDescriptor: '0x831d93E55AF23A2977E4DA892d5005f4F2995071',
					NonfungibleTokenPositionDescriptor: '0x0281E98322e4e8E53491D576Ee6A2BFCE644C55C',
					TransparentUpgradeableProxy: '0xAec98e489AE35F243eB63452f6ad233A6c97eE97',
					NonfungiblePositionManager: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613',
					V3Migrator: '0x32681814957e0C13117ddc0c2aba232b5c9e760f',
					QuoterV2: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
					SwapRouter02: '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2',
					Permit2: '0x000000000022d473030f116ddee9f6b43ac78ba3',
					UniversalRouter: '0x5302086A3a25d473aAbBd0356eFf8Dd811a4d89B',
				},
			},
			{
				chainIds: [8453],
				contractAddresses: {
					UniswapV3Factory: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
					Multicall2: '0x091e99cb1C49331a94dD62755D168E941AbD0693',
					ProxyAdmin: '0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9',
					TickLens: '0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d',
					// Quoter: '',
					// SwapRouter: '',
					NFTDescriptor: '0xF9d1077fd35670d4ACbD27af82652a8d84577d9F',
					NonfungibleTokenPositionDescriptor: '0x4f225937EDc33EFD6109c4ceF7b560B2D6401009',
					TransparentUpgradeableProxy: '0x4615C383F85D0a2BbED973d83ccecf5CB7121463',
					NonfungiblePositionManager: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
					V3Migrator: '0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7',
					QuoterV2: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
					SwapRouter02: '0x2626664c2603336E57B271c5C0b26F421741e481',
					Permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
					UniversalRouter: '0x198EF79F1F515F02dFE9e3115eD9fC07183f02fC',
				},
			},
			{
				chainIds: [100],
				contractAddresses: {
					UniswapV3Factory: '0xe32f7dd7e3f098d518ff19a22d5f028e076489b1',
					Multicall2: '0x4dfa9a980efE4802E969AC33968E3d6E59B8a19e',
					ProxyAdmin: '0x0cb49b5b72abc23426e6ce2141349b34a12aa355',
					TickLens: '0x0cb49b5b72abc23426e6ce2141349b34a12aa355',
					Quoter: '0x7E9cB3499A6cee3baBe5c8a3D328EA7FD36578f4',
					SwapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
					NFTDescriptor: '0x589f0d7a6332a15681c0938bc3bee6fd1413e939',
					NonfungibleTokenPositionDescriptor: '0x4ce075e640649ea45fc55ac0e301ff75c4cd0f0c', // '0x7b8a01b39d58278b5de7e48c8449c9f4f5170613'
					TransparentUpgradeableProxy: '0x070b849e8f2704bec603a1dd5de26acfe48d1896', // '0x32681814957e0c13117ddc0c2aba232b5c9e760f'
					V3Migrator: '0x16dd75c567a07082452ab56fd1e673987289e6ef', // '0x78d78e420da98ad378d7799be8f4af69033eb077'
					QuoterV2: '0x7e9cb3499a6cee3babe5c8a3d328ea7fd36578f4', // '0xed0d35e600ff40ac6c598c5b29468af22400fa66'
					SwapRouter02: '0xc6d25285d5c5b62b7ca26d6092751a145d50e9be', // '0x8e041632b77fd2a23bd4d9543c0b8a0039b481b4'
					Permit2: '0x000000000022d473030f116ddee9f6b43ac78ba3',
					UniversalRouter: '',

					UniswapWormholeMessageReceiver: '0xffa5599136fbab9af7799a6703b57bb33e5390cf',
					UniswapInterfaceMulticall: '0x4dfa9a980efe4802e969ac33968e3d6e59b8a19e',
				},
			}
		] as const)
			.flatMap(({ chainIds, contractAddresses }) =>
				chainIds.map(chainId => [chainId, contractAddresses])
			)
	) satisfies {
		[key in SupportedChainsType]: {
			UniswapV3Factory: Ethereum.ContractAddress,
			Multicall2: Ethereum.ContractAddress,
			ProxyAdmin: Ethereum.ContractAddress,
			TickLens: Ethereum.ContractAddress,
			Quoter?: Ethereum.ContractAddress,
			SwapRouter?: Ethereum.ContractAddress,
			NFTDescriptor: Ethereum.ContractAddress,
			NonfungibleTokenPositionDescriptor: Ethereum.ContractAddress,
			TransparentUpgradeableProxy: Ethereum.ContractAddress,
			NonfungiblePositionManager: Ethereum.ContractAddress,
			V3Migrator: Ethereum.ContractAddress,
			QuoterV2: Ethereum.ContractAddress,
			SwapRouter02: Ethereum.ContractAddress,
			Permit2: Ethereum.ContractAddress,
			UniversalRouter: Ethereum.ContractAddress,
		}
	}


	export enum DataProvider {
		RpcProvider = 'RPC Provider',
		TheGraph = 'The Graph',
	}

	export const getDeployedPoolAddress = memoized(({
		chainId,
		pool,
	}: {
		chainId: Ethereum.ChainID,
		pool: Pool,
	}) => computePoolAddress({
		factoryAddress: deployedContractsByChainId[chainId].UniswapV3Factory,
		tokenA: { address: pool.token0.address } as Token,
		tokenB: { address: pool.token1.address } as Token,
		fee: pool.fee,
	}) as Ethereum.ContractAddress)

	export const getDeployedPoolInfo = async ({
		dataProvider,
		network,
		address,
		publicClient,
	}: ({
		dataProvider: DataProvider.RpcProvider,
		publicClient: Ethereum.PublicClient,
	} | {
		dataProvider: DataProvider.TheGraph, // Omit<DataProvider, DataProvider.RpcProvider>
		publicClient?: undefined,
	}) & {
		network: Ethereum.Network,
		address: Ethereum.ContractAddress,
	}) => {
		switch(dataProvider){
			case DataProvider.RpcProvider: {
				return Object.fromEntries(
					await Promise.all(
						['token0', 'token1', 'fee']
							.map(async functionName => [
								functionName,
								await publicClient.readContract({
									functionName,
									address,
									abi: IUniswapV3Pool.abi,
								})
							])
					)
				) as Pool
			}
		}
	}

	export const getDeployedPool = async ({
		dataProvider,
		publicClient,
		network,
		address,
		pool,
	}:  ({
		dataProvider: DataProvider.RpcProvider,
		publicClient: Ethereum.PublicClient,
	} | {
		dataProvider: DataProvider.TheGraph, // Omit<DataProvider, DataProvider.RpcProvider>
		publicClient?: undefined,
	}) & {
		network: Ethereum.Network,
		address?: Ethereum.ContractAddress,
		pool?: Pool,
	}) => ({
		contract: {
			address:
				address ??
				(pool && await getDeployedPoolAddress({
					chainId: network.chainId,
					pool,
				})),
		},
		...(
			pool ??
			(address && await getDeployedPoolInfo({
				dataProvider,
				publicClient,
				network,
				address,
			}))
		),
	} as DeployedPool)
}
