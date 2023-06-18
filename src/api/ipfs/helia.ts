import type { IDBDatastore } from 'datastore-idb'

let localIpfsDatastore: IDBDatastore

export const getLocalIpfsDatastore = async () => {
	if(!localIpfsDatastore){
		const { IDBDatastore } = await import('datastore-idb')

		localIpfsDatastore = new IDBDatastore('blockhead/helia/datastore')
		await localIpfsDatastore.open()
	}
	return localIpfsDatastore
}


import type { IDBBlockstore } from 'blockstore-idb'

let localIpfsBlockstore: IDBBlockstore

export const getLocalIpfsBlockstore = async () => {
	if(!localIpfsBlockstore){
		const { IDBBlockstore } = await import('blockstore-idb')

		localIpfsBlockstore = new IDBBlockstore('blockhead/helia/blockstore')
		await localIpfsBlockstore.open()
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
import { asyncIterableFromStream, streamFromAsyncIterable } from '../../utils/convertAsyncIterable'

export const getIpfsContent = async ({
	ipfsContentId,
	ipfsContentPath,
}: {
	ipfsContentId: IpfsCid,
	ipfsContentPath?: string,
}) => {
	const { CID } = await import('multiformats/cid')

	const cid = CID.parse(ipfsContentId)

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


export const encodeBytes = async (content: string | Blob | File) => {
	const fs = await getLocalFilesystem()

	// const bytes = new TextEncoder().encode(content)

	const blob = await new Response(content).blob()
	const buffer = await blob.arrayBuffer()
	const bytes = new Uint8Array(buffer)

	const cid = await fs.addBytes(bytes, {
		onProgress: (e) => {
			console.info('encodeContent progress', e)
		}
	})

	return {
		cid,
		blob,
		buffer,
		bytes,
	}
}


export const encodeFile = async (file: File) => {
	const fs = await getLocalFilesystem()

	const stream = await file.stream()

	const cid = await fs.addFile({
		content: await asyncIterableFromStream(stream)
	}, {
		onProgress: (e) => {
			console.info('encodeFile progress', e)
		}
	})

	return {
		cid,
	}
}
