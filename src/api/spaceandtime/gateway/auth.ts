// Types
import type { AccessTokenResponse } from '../gateway'


// Context
import * as publicEnv from '$env/static/public'


// State
const accessTokenCache: Record<string, AccessTokenResponse> = {}


// Functions
import { logInWithApiKey } from '../gateway'

export const getAccessToken = async (
	apiKey = publicEnv.PUBLIC_SPACEANDTIME_GATEWAY_API_KEY,
) => {
	{
		const accessTokenResponse = accessTokenCache[apiKey]

		if (accessTokenResponse && Date.now() < accessTokenResponse.accessTokenExpires)
			return accessTokenResponse.accessToken
	}

	{
		const accessTokenResponse = await logInWithApiKey(apiKey)
		accessTokenCache[apiKey] = accessTokenResponse
		return accessTokenResponse.accessToken
	}
}
