export enum NotificationsProvider {
	Push = 'Push Protocol'
}


import { PushIcon } from '$/assets/icons'

export const notificationsProviderIcons: Record<NotificationsProvider, string> = {
	[NotificationsProvider.Push]: PushIcon,
}
