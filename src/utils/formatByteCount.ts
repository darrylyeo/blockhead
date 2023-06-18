export const formatByteCount = (byteCount: number | BigInt) => {
	if (byteCount === 0) return '0 B'

	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(Number(byteCount)) / Math.log(1024))
	return `${parseFloat((Number(byteCount) / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
}
