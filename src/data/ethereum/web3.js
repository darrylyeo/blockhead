let Web3

export async function getWeb3(){
	if(!Web3)
		Web3 = (await import('web3')).default
	return Web3
}