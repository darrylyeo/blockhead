export const proxyFetch: typeof fetch = async (url, ...args) => (
	fetch(`/api-proxy/${url}`, ...args)
)
