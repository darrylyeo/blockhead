import type { BaseDatastore } from 'datastore-core'
import type { IDBDatastore } from 'datastore-idb'

let localIpfsDatastore: BaseDatastore

export const getLocalIpfsDatastore = async () => {
	if(!localIpfsDatastore){
		try {
			const { IDBDatastore } = await import('datastore-idb')
			localIpfsDatastore = new IDBDatastore('blockhead/helia/datastore')
			await (localIpfsDatastore as IDBDatastore).open()
		}catch(e){
			console.error(e)

			const { MemoryDatastore } = await import('datastore-core')
			localIpfsDatastore = new MemoryDatastore()
		}
	}
	return localIpfsDatastore
}


import type { BaseBlockstore } from 'blockstore-core'
import type { IDBBlockstore } from 'blockstore-idb'

let localIpfsBlockstore: BaseBlockstore

export const getLocalIpfsBlockstore = async () => {
	if(!localIpfsBlockstore){
		try {
			const { IDBBlockstore } = await import('blockstore-idb')
			localIpfsBlockstore = new IDBBlockstore('blockhead/helia/blockstore')
			await (localIpfsBlockstore as IDBBlockstore).open()
		}catch(e){
			console.error(e)

			const { MemoryBlockstore } = await import('blockstore-core')
			localIpfsBlockstore = new MemoryBlockstore()
		}
	}
	return localIpfsBlockstore
}


import type { createHelia } from 'helia'

let localIpfsNode: Awaited<ReturnType<typeof createHelia>>

export const getLocalIpfsNode = async () => {
	if(!localIpfsNode){
		const { createHelia } = await import('helia')

		localIpfsNode = await createHelia({
			datastore: await getLocalIpfsDatastore(),
			blockstore: await getLocalIpfsBlockstore(),
		})
	}
	return localIpfsNode
}


import type { IPNS } from '@helia/ipns'

let localIpnsClient: IPNS

export const getLocalIpnsClient = async () => {
	if(!localIpnsClient){
		const { ipns } = await import('@helia/ipns')
		const { dht, pubsub } = await import('@helia/ipns/routing')

		const localIpfsNode = await getLocalIpfsNode()

		const ipnsRouters = [
			dht(localIpfsNode),
			pubsub(localIpfsNode),
		]

		localIpnsClient = ipns(localIpfsNode, ipnsRouters)
	}
	return localIpnsClient
}


import type { UnixFS } from '@helia/unixfs'

let localFs: UnixFS

export const getLocalFilesystem = async () => {
	if(!localFs){
		const { unixfs } = await import('@helia/unixfs')

		const localIpfsNode = await getLocalIpfsNode()

		localFs = unixfs(localIpfsNode)
	}
	return localFs
}


import type { IpfsCid } from './contentId'
import type { IpnsName } from './ipns'

import { asyncIterableFromStream, streamFromAsyncIterable } from '$/utils/convertAsyncIterable'

export const resolveIpfsContentId = async ({
	ipfsContentId,
	ipnsName,
}: ({
	ipfsContentId: IpfsCid,
	ipnsName?: undefined,
} | {
	ipfsContentId?: undefined,
	ipnsName: IpnsName,
})) => {
	if(ipfsContentId){
		const { CID } = await import('multiformats/cid')

		return CID.parse(ipfsContentId)
	}

	else if(ipnsName){
		const ipnsClient = await getLocalIpnsClient()

		return await ipnsClient.resolveDns(ipnsName)
	}
}

export const getIpfsContent = async ({
	ipfsContentId,
	ipnsName,
	ipfsContentPath,
}: ({
	ipfsContentId: IpfsCid,
	ipnsName?: undefined,
} | {
	ipfsContentId?: undefined,
	ipnsName: IpnsName,
}) & {
	ipfsContentPath?: string,
}) => {
	const cid = await resolveIpfsContentId({
		ipfsContentId,
		ipnsName,
	})

	if(!cid)
		throw new Error('No CID found')

	const fs = await getLocalFilesystem()

	return new Response(
		await streamFromAsyncIterable(
			fs.cat(cid, {
				path: ipfsContentPath,
				onProgress: e => {
					// console.info('progress', e)
				},
			})
		)
	)
}

export const getIpfsDag = async ({
	ipfsContentId,
	ipfsContentPath,
}: {
	ipfsContentId: IpfsCid,
	ipfsContentPath?: string,
}) => {
	const { CID } = await import('multiformats/cid')

	const cid = CID.parse(ipfsContentId)

	const fs = await getLocalFilesystem()

	return await fs.stat(cid, {
		path: ipfsContentPath,
		onProgress: e => {
			// console.info('progress', e)
		},
	})
}


export const encodeBytes = async (content: string | Blob | File) => {
	const fs = await getLocalFilesystem()

	// const bytes = new TextEncoder().encode(content)

	const blob = await new Response(content).blob()
	const buffer = await blob.arrayBuffer()
	const bytes = new Uint8Array(buffer)

	const cid = await fs.addBytes(bytes, {
		onProgress: (e) => {
			// console.info('encodeContent progress', e)
		}
	})

	return cid
}


export const encodeFile = async (file: File) => {
	const fs = await getLocalFilesystem()

	const stream = await file.stream()

	const cid = await fs.addFile({
		content: await asyncIterableFromStream(stream)
	}, {
		onProgress: (e) => {
			// console.info('encodeFile progress', e)
		}
	})

	return cid
}


export const encodeFiles = async (files: FileList) => {
	const fs = await getLocalFilesystem()

	const addedFiles = await Array.fromAsync(
		await fs.addAll(
			await Array.fromAsync(files, async file => ({
				path: file.webkitRelativePath,
				content: asyncIterableFromStream(await file.stream())
			})),
			{
				onProgress: (e) => {
					// console.info('encodeFiles progress', e)
				}
			}
		)
	)

	return addedFiles
}
