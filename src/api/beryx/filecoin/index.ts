import { env } from '$/env'


import { defaults } from './api'

defaults.headers = {
	Authorization: `Bearer ${env.BERYX_API_KEY}`,
}


export * from './api'
