import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Contract } from '$/entities/contract'
import { ContractStandard, ContractCategory } from '$/entities/contract'

export const fetch = async (variables: {
	chainId: ChainId
	address: Address
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	return (
		await createClient(variables.chainId)
			.query(
				graphql(`
					query GetSmartContract($addressHash: AddressHash!) {
						address(hash: $addressHash) {
							hash
							contractCode
							smartContract {
								name
								abi
								contractSourceCode
								compilerVersion
								addressHash
								verifiedViaSourcify
								verifiedViaEthBytecodeDb
								partiallyVerified
							}
						}
					}
				`),
				{
					addressHash: variables.address
				}
			)
			.toPromise()
			.then(({ data, error }) => {
				if (error)
					throw error

				if (!data?.address?.contractCode || data.address.contractCode === '0x')
					throw new Error('Address is not a contract')

				return data.address
			})
	)
}

export const normalize = (data: any, variables: { chainId: ChainId, address: Address }) => {
	const addressData = data

	if (!addressData || !addressData.contractCode || addressData.contractCode === '0x') {
		throw new Error(`Address is not a contract`)
	}

	const smartContract = addressData.smartContract
	const bytecode = addressData.contractCode

	const result: any = {
		address: addressData.hash,
		chainId: variables.chainId,
		standards: [ContractStandard.Custom],
		categories: [ContractCategory.Utility],
		bytecode: bytecode as `0x${string}`,
		verification: {
			isVerified: smartContract?.verifiedViaSourcify || smartContract?.verifiedViaEthBytecodeDb || false,
			...(smartContract?.verifiedViaSourcify && {
				verificationService: 'sourcify' as const
			}),
			...(smartContract?.verifiedViaEthBytecodeDb && !smartContract?.verifiedViaSourcify && {
				verificationService: 'etherscan' as const
			}),
			...(smartContract?.partiallyVerified !== undefined && {
				sourcifyMatch: smartContract.partiallyVerified ? 'partial' as const : 
					smartContract.verifiedViaSourcify ? 'perfect' as const : 'none' as const
			}),
		},
	}

	// Only add fields when we have actual data
	if (smartContract?.name) result.name = smartContract.name
	if (smartContract?.contractSourceCode) result.sourceCode = smartContract.contractSourceCode
	if (smartContract?.compilerVersion) result.compilerVersion = smartContract.compilerVersion
	if (smartContract?.optimization !== undefined) result.optimizationEnabled = smartContract.optimization

	// Only add ABI-related fields if we have an ABI
	if (smartContract?.abi) {
		result.abi = smartContract.abi.map((item: any) => ({
			...(item.name && { name: item.name }),
			type: item.type || 'function',
			...(item.type === 'function' && item.name && item.inputs && {
				signature: `${item.name}(${item.inputs.map((i: any) => i.type).join(',')})`
			}),
			...(item.inputs && { inputs: item.inputs }),
			...(item.outputs && { outputs: item.outputs }),
			...(item.stateMutability && { stateMutability: item.stateMutability }),
		}))

		const functions = smartContract.abi.filter((item: any) => item.type === 'function')
		if (functions.length > 0) {
			result.functions = functions.map((item: any) => ({
				...(item.name && { name: item.name }),
				type: 'function' as const,
				...(item.name && item.inputs && {
					signature: `${item.name}(${item.inputs.map((i: any) => i.type).join(',')})`
				}),
				...(item.inputs && { inputs: item.inputs }),
				...(item.outputs && { outputs: item.outputs }),
				...(item.stateMutability && { stateMutability: item.stateMutability }),
			}))
		}

		const events = smartContract.abi.filter((item: any) => item.type === 'event')
		if (events.length > 0) {
			result.events = events.map((item: any) => ({
				...(item.name && { name: item.name }),
				type: 'event' as const,
				...(item.name && item.inputs && {
					signature: `${item.name}(${item.inputs.map((i: any) => i.type).join(',')})`
				}),
				...(item.inputs && { inputs: item.inputs }),
			}))
		}
	}

	return result as any
}

