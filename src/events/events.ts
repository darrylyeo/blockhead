export type Events = {
	'Preferences/Change': {
		preferenceKey: string;
		preferenceValue: string;
	}
}

export type EventType = keyof Events
