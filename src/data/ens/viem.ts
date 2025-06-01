import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { ENSName, ENSDomain, ENSReverseRecord } from '$/entities/ens'
import { ENSNameStatus, ENSRecordType } from '$/entities/ens'

// ENS is only available on Ethereum mainnet
const ENS_CHAIN_ID = 1

export const fetch = async (chainId: ChainId, ensName: ENSName) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// Get primary ENS data
		const [address, resolver, expiryDate] = await Promise.allSettled([
			client.getEnsAddress({ name: ensName }),
			client.getEnsResolver({ name: ensName }),
			// Expiry date requires additional ENS registry calls which viem doesn't support directly
			Promise.resolve(undefined),
		])
		
		const resolvedAddress = address.status === 'fulfilled' ? address.value : null
		const resolverAddress = resolver.status === 'fulfilled' ? resolver.value : null
		
		// If we have a resolver, fetch text records
		let records: any = {}
		if (resolverAddress && resolvedAddress) {
			const [avatar, description, email, url, twitter, github] = await Promise.allSettled([
				client.getEnsAvatar({ name: ensName }),
				client.getEnsText({ name: ensName, key: 'description' }),
				client.getEnsText({ name: ensName, key: 'email' }),
				client.getEnsText({ name: ensName, key: 'url' }),
				client.getEnsText({ name: ensName, key: 'com.twitter' }),
				client.getEnsText({ name: ensName, key: 'com.github' }),
			])
			
			records = {
				avatar: avatar.status === 'fulfilled' ? avatar.value : undefined,
				description: description.status === 'fulfilled' ? description.value : undefined,
				email: email.status === 'fulfilled' ? email.value : undefined,
				url: url.status === 'fulfilled' ? url.value : undefined,
				twitter: twitter.status === 'fulfilled' ? twitter.value : undefined,
				github: github.status === 'fulfilled' ? github.value : undefined,
			}
		}
		
		return {
			ensName,
			resolvedAddress,
			resolverAddress,
			records,
			chainId,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		throw new Error(`Viem ENS error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, chainId: ChainId, ensName: ENSName) => {
	const { resolvedAddress, resolverAddress, records } = data
	
	// Parse ENS name parts
	const parts = ensName.split('.')
	const tld = parts[parts.length - 1]
	const sld = parts.length > 1 ? parts[parts.length - 2] : undefined
	const subdomain = parts.length > 2 ? parts.slice(0, -2).join('.') : undefined
	
	// Determine status
	let status: ENSNameStatus = ENSNameStatus.Available
	if (resolvedAddress) {
		status = ENSNameStatus.Active
	}
	
	// Create ENS domain object
	const ensDomain = {
		name: ensName,
		normalizedName: ensName.toLowerCase(),
		node: '0x0000000000000000000000000000000000000000000000000000000000000000', // Would need to calculate
		labelhash: '0x0000000000000000000000000000000000000000000000000000000000000000', // Would need to calculate
		chainId,
		tld,
		sld,
		subdomain,
		registeredAt: Math.floor(Date.now() / 1000), // Default to now, would need registry data
		status,
		isAvailable: status === ENSNameStatus.Available,
		resolver: resolverAddress,
		records: {
			addresses: resolvedAddress ? [{ 
				coinType: 60, // ETH
				coinName: 'ETH',
				address: resolvedAddress,
				updatedAt: Math.floor(Date.now() / 1000),
			}] : [],
			text: Object.entries(records || {})
				.filter(([, value]) => value)
				.map(([key, value]) => ({
					key,
					value: value as string,
					updatedAt: Math.floor(Date.now() / 1000),
				})),
			avatar: records?.avatar,
			email: records?.email,
			url: records?.url,
			twitter: records?.twitter,
			github: records?.github,
			description: records?.description,
		},
		source: 'viem',
		fetchedAt: data.fetchedAt,
	}
	
	return ensDomain as any // Type assertion to avoid deep instantiation issues
}

// Fetch reverse ENS record for an address
export const fetchReverse = async (chainId: ChainId, address: Address) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		const ensName = await client.getEnsName({ address: address as `0x${string}` })
		
		return {
			address,
			ensName,
			chainId,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		throw new Error(`Viem ENS reverse error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalizeReverse = (data: any, chainId: ChainId, address: Address) => {
	const reverseRecord = {
		address,
		name: data.ensName || '',
		node: '0x0000000000000000000000000000000000000000000000000000000000000000', // Would need to calculate
		chainId,
		resolver: '0x0000000000000000000000000000000000000000', // Would need registry data
		verifiedAt: data.fetchedAt,
		lastChecked: data.fetchedAt,
		isValid: !!data.ensName,
		validationErrors: data.ensName ? [] : ['No reverse record found'],
	}
	
	return reverseRecord as any // Type assertion to avoid deep instantiation issues
}
