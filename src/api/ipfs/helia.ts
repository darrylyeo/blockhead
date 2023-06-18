import type { createHelia } from 'helia'

let localIpfsNode: Awaited<ReturnType<typeof createHelia>>

export const getLocalIpfsNode = async () => {
	if(localIpfsNode) return localIpfsNode

	const { MemoryDatastore } = await import('datastore-core')
	const { MemoryBlockstore } = await import('blockstore-core')
	const { createHelia } = await import('helia')

	return localIpfsNode = await createHelia({
		blockstore: new MemoryBlockstore(),
		datastore: new MemoryDatastore()
	})
}


import type { UnixFS } from '@helia/unixfs'

let localFs: UnixFS

export const getLocalFilesystem = async () => {
	if(localFs) return localFs

	const { unixfs } = await import('@helia/unixfs')

	const localIpfsNode = await getLocalIpfsNode()
	return localFs = unixfs(localIpfsNode)
}


import type { IpfsCid } from './contentId'
import { streamFromAsyncIterable } from '../../utils/convertAsyncIterable'

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
