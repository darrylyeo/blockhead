export enum NotificationsProvider {
	Push = 'Push Protocol'
}


import { PushIcon } from '$/assets/icons'

export const notificationsProviders = {
	[NotificationsProvider.Push]: {
		name: 'Push Protocol',
		icon: PushIcon,
	},
} as const satisfies Record<NotificationsProvider, {
	name: string
	icon?: string
}>
