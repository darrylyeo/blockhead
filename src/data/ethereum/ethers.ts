let ethers

export async function getEthersJS() {
	if (!ethers)
		ethers = (await import('ethers')).ethers
	return ethers
}