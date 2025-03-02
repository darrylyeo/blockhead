/**
 * # Space and Time
 * Gateway (Secrets Proxy) Rest APIs
 * 
 * {@link https://docs.spaceandtime.io/reference/secrets-proxy-overview}
 */


// Functions
const post = async <T>(
	endpoint: string, 
	body: Record<string, unknown>,
	headers: Record<string, string> = {}
) => {
	const response = await fetch(`https://proxy.api.spaceandtime.dev/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			...headers
		},
		body: JSON.stringify(body)
	})

	const data = await response.json()
	
	// If response was not ok, throw the error data directly
	if (!response.ok)
		throw data
	
	return data as T
}


/**
 * Gateway Authentication APIs
 */

export type AccessTokenResponse = {
	/** Access token for use in other SxT APIs */
	accessToken: string
	/** Refresh token for use in other Security APIs */
	refreshToken: string
	/** Access token expiry time (ms) */
	accessTokenExpires: number
	/** Refresh token expiry time (ms) */
	refreshTokenExpires: number
}

/**
 * # API Key Login
 * 
 * Authenticate with the SxT network via a Gateway Proxy API Key
 * 
 * {@link https://docs.spaceandtime.io/reference/apikey-authn}
 */
export const logInWithApiKey = async (
	apiKey: string,
) => {
	return post<
		AccessTokenResponse
	>(
		'auth/apikey',
		{},
		{
			'apikey': apiKey,
		}
	)
}
