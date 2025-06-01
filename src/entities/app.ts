import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { DataSource } from '../data'
import type { ChainId } from './network'
import type { Address } from './scalars'

// App configuration
export type App = {
	// Identification
	name: string
	slug: string
	
	// Presentation
	icon?: string
	colors?: string[]
	links?: string[]
	
	// App views/deployments
	views: AppView[]
}

// App view (deployment on specific chain)
export type AppView = {
	// View metadata
	name?: string
	slug?: string
	chainId?: ChainId
	
	// UI configuration
	colors?: string[]
	
	// Components and UI
	components?: ComponentType[]
	embeds?: {
		name: string
		description?: string
		src: string
	}[]
	
	// Blockchain entities
	contracts?: PartialExceptOneOf<Contract, 'address'>[]
	
	// Categorization
	tags?: string[]
	links?: string[]
	
	// Data source providers with their app-specific identifiers
	providers?: Partial<Record<DataSource, string | string[]>>
}

// NFT contract definition
export type NftContract = {
	address: Address
	chainId: ChainId
	name: string
	symbol?: string
	standard?: 'Erc721' | 'Erc1155'
	icon?: string
}

// Provider configuration for data sources
export type DataSourceConfig<_DataSource extends DataSource = DataSource> = {
	source: _DataSource
} & (
	_DataSource extends DataSource.TheGraph ?
		{
			subgraphUrl: string
			queryBatchSize?: number
		}
	: _DataSource extends DataSource.OneInch ?
		{
			version?: 'v5' | 'v6'
			chainIds: ChainId[]
		}
	: _DataSource extends DataSource.Zapper ?
		{
			appId: string
			network?: string
		}
	: _DataSource extends DataSource.DefiLlama ?
		{
			protocol: string
			chain?: string
		}
	: {}
) 