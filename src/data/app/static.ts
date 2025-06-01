import type { ChainId } from '$/entities/network'
import type { Address } from '$/entities/scalars'
import type { App, AppView } from '$/entities/app'

// Static app configurations - would be loaded from a database in production
const APPS: Record<string, App> = {
	'uniswap': {
		name: 'Uniswap',
		slug: 'uniswap',
		icon: 'https://app.uniswap.org/favicon.ico',
		colors: ['#FF007A', '#4C82FB'],
		links: ['https://uniswap.org', 'https://app.uniswap.org'],
		views: [
			{
				name: 'Uniswap V3',
				slug: 'v3',
				chainId: 1,
				colors: ['#FF007A', '#4C82FB'],
				contracts: [
					{ address: '0x1F98431c8aD98523631AE4a59f267346ea31F984' }, // Factory
					{ address: '0xE592427A0AEce92De3Edee1F18E0157C05861564' }, // Router
				],
				tags: ['dex', 'amm', 'defi'],
				links: ['https://app.uniswap.org'],
			},
			{
				name: 'Uniswap V3 Polygon',
				slug: 'v3-polygon',
				chainId: 137,
				contracts: [
					{ address: '0x1F98431c8aD98523631AE4a59f267346ea31F984' },
				],
				tags: ['dex', 'amm', 'defi'],
			},
		],
	},
	'aave': {
		name: 'Aave',
		slug: 'aave',
		icon: 'https://app.aave.com/favicon.ico',
		colors: ['#B6509E', '#2EBAC6'],
		links: ['https://aave.com', 'https://app.aave.com'],
		views: [
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 1,
				contracts: [
					{ address: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2' }, // Pool
				],
				tags: ['lending', 'borrowing', 'defi'],
			},
		],
	},
	'compound': {
		name: 'Compound',
		slug: 'compound',
		icon: 'https://compound.finance/favicon.ico',
		colors: ['#00D395', '#7C4DFF'],
		links: ['https://compound.finance', 'https://app.compound.finance'],
		views: [
			{
				name: 'Compound V2',
				slug: 'v2',
				chainId: 1,
				contracts: [
					{ address: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B' }, // Comptroller
				],
				tags: ['lending', 'borrowing', 'defi'],
			},
		],
	},
	'opensea': {
		name: 'OpenSea',
		slug: 'opensea',
		icon: 'https://opensea.io/favicon.ico',
		colors: ['#2081E2', '#3B98F5'],
		links: ['https://opensea.io'],
		views: [
			{
				name: 'OpenSea',
				slug: 'main',
				chainId: 1,
				contracts: [
					{ address: '0x00000000006c3852cbEf3e08E8dF289169EdE581' }, // Seaport
				],
				tags: ['nft', 'marketplace'],
			},
		],
	},
	'sushiswap': {
		name: 'SushiSwap',
		slug: 'sushiswap',
		icon: 'https://app.sushi.com/favicon.ico',
		colors: ['#FA52A0', '#FEC84A'],
		links: ['https://sushi.com', 'https://app.sushi.com'],
		views: [
			{
				name: 'SushiSwap',
				slug: 'main',
				chainId: 1,
				contracts: [
					{ address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F' }, // Router
				],
				tags: ['dex', 'amm', 'defi'],
			},
		],
	},
}

export const fetch = async (appSlug: string) => {
	// Simulate API delay
	await new Promise(resolve => setTimeout(resolve, 50))
	
	const app = APPS[appSlug.toLowerCase()]
	if (!app) {
		throw new Error(`App ${appSlug} not found`)
	}
	
	return {
		...app,
		fetchedAt: Math.floor(Date.now() / 1000),
	}
}

export const normalize = (data: any, appSlug: string): App => {
	return {
		name: data.name,
		slug: data.slug,
		icon: data.icon,
		colors: data.colors,
		links: data.links,
		views: data.views,
	} as App
}

// Fetch app by contract address
export const fetchByContract = async (chainId: ChainId, contractAddress: Address) => {
	// Find app that has this contract
	for (const [slug, app] of Object.entries(APPS)) {
		for (const view of app.views) {
			if (view.chainId === chainId && view.contracts) {
				const hasContract = view.contracts.some(
					contract => contract.address.toLowerCase() === contractAddress.toLowerCase()
				)
				if (hasContract) {
					return {
						...app,
						matchedView: view,
						fetchedAt: Math.floor(Date.now() / 1000),
					}
				}
			}
		}
	}
	
	throw new Error(`No app found for contract ${contractAddress} on chain ${chainId}`)
}

// Get all apps for a chain
export const fetchByChain = async (chainId: ChainId) => {
	const appsForChain = Object.values(APPS).filter(app =>
		app.views.some(view => view.chainId === chainId)
	)
	
	return {
		apps: appsForChain,
		chainId,
		fetchedAt: Math.floor(Date.now() / 1000),
	}
}

// Get popular apps
export const fetchPopular = async (limit: number = 10) => {
	// Return apps ordered by some popularity metric (mock)
	const popularSlugs = ['uniswap', 'aave', 'opensea', 'compound', 'sushiswap']
	const apps = popularSlugs.slice(0, limit).map(slug => APPS[slug]).filter(Boolean)
	
	return {
		apps,
		fetchedAt: Math.floor(Date.now() / 1000),
	}
}
