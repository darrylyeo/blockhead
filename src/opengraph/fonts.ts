import { read as _read } from '$app/server'
const read = (...args: Parameters<typeof _read>) => {
	try {
		return _read(...args)
	}catch (error) {
		console.error(error)
	}
}


import FiraCode400 from '@fontsource/fira-code/files/fira-code-latin-400-normal.woff'
import FiraCode500 from '@fontsource/fira-code/files/fira-code-latin-500-normal.woff'
import FiraCode600 from '@fontsource/fira-code/files/fira-code-latin-600-normal.woff'
import FiraCode700 from '@fontsource/fira-code/files/fira-code-latin-700-normal.woff'
import Ubuntu400 from '@fontsource/ubuntu/files/ubuntu-latin-400-normal.woff'
import Ubuntu500 from '@fontsource/ubuntu/files/ubuntu-latin-500-normal.woff'
import Ubuntu700 from '@fontsource/ubuntu/files/ubuntu-latin-700-normal.woff'

export const fonts = [
	{
		name: 'Fira Code',
		data: await read(FiraCode400)?.arrayBuffer(),
		style: 'normal',
		weight: '400',
	},
	{
		name: 'Fira Code',
		data: await read(FiraCode500)?.arrayBuffer(),
		style: 'normal',
		weight: '500',
	},
	{
		name: 'Fira Code',
		data: await read(FiraCode600)?.arrayBuffer(),
		style: 'normal',
		weight: '600',
	},
	{
		name: 'Fira Code',
		data: await read(FiraCode700)?.arrayBuffer(),
		style: 'normal',
		weight: '700',
	},
	{
		name: 'Ubuntu',
		data: await read(Ubuntu400)?.arrayBuffer(),
		style: 'normal',
		weight: '400',
	},
	{
		name: 'Ubuntu',
		data: await read(Ubuntu500)?.arrayBuffer(),
		style: 'normal',
		weight: '500',
	},
	{
		name: 'Ubuntu',
		data: await read(Ubuntu700)?.arrayBuffer(),
		style: 'normal',
		weight: '700',
	},
]
	.filter(font => font.data)
