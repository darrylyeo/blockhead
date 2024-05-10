import * as publicEnv from '$env/static/public'


import { defaults } from './api'

defaults.headers = {
	Authorization: `Bearer ${publicEnv.PUBLIC_BERYX_API_KEY}`,
}


export * from './api'
