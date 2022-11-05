import type { Ethereum } from '../data/ethereum/types'


export type SolidityJsonAbi = {
	inputs?: {
		indexed?: boolean;
		internalType: string;
		name: string;
		type: string;
	}[];
	stateMutability?: string;
	type: 'constructor' | 'event' | 'function';
	anonymous?: boolean;
	name?: string;
	outputs?: {
		internalType: string;
		name: string;
		type: string;
	}[];
}[]

export type ContractMetadata<SourcePath extends string> = {
	"compiler": {
		"version": string
	},
	"language": "Solidity" | string,
	"output": {
		"abi": SolidityJsonAbi,
		"devdoc": {
			"kind": "dev" | string,
			"methods": {},
			"version": number
		},
		"userdoc": {
			"kind": "user" | string,
			"methods": {},
			"version": number
		}
	},
	"settings": {
		"compilationTarget": Record<SourcePath, string>,
		"evmVersion": "istanbul" | string,
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs" | string
		},
		"optimizer": {
			"enabled": boolean,
			"runs": number
		},
		"remappings": []
	},
	"sources": Record<SourcePath, {
		"content"?: string,
		"keccak256": `0x${string}`, // 64
		"license": string,
		"urls"?: string[]
	}>,
	"version": number
}


export const getSourcifyUrl = ({
	contractAddress,
	chainId,
	match = 'full_match',
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainID,
	match?: 'full_match' | 'partial_match'
}) =>
	`https://repo.sourcify.dev/contracts/${match}/${chainId}/${contractAddress}`

export const getContractMetadata = async ({
	contractAddress,
	chainId,
	match,
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainID,
	match?: 'full_match' | 'partial_match'
}) =>
	await fetch(`${getSourcifyUrl({
		contractAddress,
		chainId,
		match,
	})}/metadata.json`)
		.then(r => r.json()) as ContractMetadata<string>
