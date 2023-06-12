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
import { CID } from 'multiformats/cid'

export const getLocalIpfsContent = async ({ ipfsCid, path, type = 'png' }: {ipfsCid: IpfsCid, path?: string, type: string }) => {
	const fs = await getLocalFilesystem()

	const cid = CID.parse(ipfsCid)

	if(type === 'text'){
		let text = ''
		const decoder = new TextDecoder('utf-8')

		try {
			for await (const chunk of fs.cat(cid)) {
				text += decoder.decode(chunk, {
					stream: true
				})
			}
			return text
		} catch (e) {
			console.error(e)
		}
	}else if(type === 'png'){
		const stream = new ReadableStream({
			start: controller => async () => {
				for await (const chunk of fs.cat(cid, { path }))
					controller.enqueue(chunk)
			}
		})

		return new Response(stream).blob()
			// .then(blob => URL.createObjectURL(blob))
			.then(blob => new Promise((resolve, reject) => {
				const fileReader = new FileReader()
				fileReader.onload = e => console.log(e)||resolve(e.target.result)
				fileReader.onprogress = e => console.info('progress', e)
				fileReader.onerror = e => reject(e.target.result)
				fileReader.onabort = e => reject(new Error('Aborted'))
				fileReader.readAsDataURL(blob)
			}))
	}
}
