// OpenGraph load
export const load = async ({
	data: {
		address,
		network,
		publicClient,
		ensName,
		bytecode,
		contractMetadata,
		addressType,
		contractName,
		sourcePaths,
	},
}: {
	data: Awaited<ReturnType<typeof import('../layout.opengraph').load>>
}) => {
	return {
		bytecode,
		contractMetadata,
		addressType,
		contractName,
		sourcePaths,
	}
}
