// https://audiusproject.github.io/api-docs

export namespace Audius {
	export type UserResponse = {
		"data": User[]
	}


	export type User = {
		"album_count": number,
		"bio": string,
		"cover_photo": CoverPhoto,
		"followee_count": number,
		"follower_count": number,
		"handle": string,
		"id": string,
		"is_verified": boolean,
		"location": string,
		"name": string,
		"playlist_count": number,
		"profile_picture": ProfilePicture
		"repost_count": number,
		"track_count": number
	}


	export type CoverPhoto = {
		"640x": string,
		"2000x": string
	}


	export type ProfilePicture = {
		"150x150": string,
		"480x480": string,
		"1000x1000": string
	}


	export type TracksResponse = {
		"data": Track[]
	}


	export type Track = {
		"artwork": TrackArtwork,
		"description": string,
		"genre": string,
		"id": string,
		"mood": string,
		"release_date": string,
		"remix_of": RemixParent,
		"repost_count": number,
		"favorite_count": number,
		"tags": string,
		"title": string,
		"user": User,
		"duration": number,
		"downloadable": boolean,
		"play_count": number
	}


	export type TrackArtwork = {
		"150x150": string,
		"480x480": string,
		"1000x1000": string
	}


	export type RemixParent = {
		"tracks": TrackElement[]
	}


	export type TrackElement = {
		"parent_track_id": string
	}


	export type Reposts = {
		"data": Activity[]
	}


	export type Activity = {
		"timestamp": string,
		"item_type": {},
		"item": {}
	}


	export type FavoritesResponse = {
		"data": Favorite[]
	}


	export type Favorite = {
		"favorite_item_id": string,
		"favorite_type": string,
		"user_id": string
	}


	export type TagsResponse = {
		"data": [
			string
		]
	}


	export type UserSearch = {
		"data": User[]
	}


	export type PlaylistResponse = {
		"data": Playlist[]
	}


	export type Playlist = {
		"artwork": PlaylistArtwork,
		"description": string,
		"id": string,
		"is_album": boolean,
		"playlist_name": string,
		"repost_count": number,
		"favorite_count": number,
		"total_play_count": number,
		"user": User
	}


	export type PlaylistArtwork = {
		"150x150": string,
		"480x480": string,
		"1000x1000": string
	}


	export type PlaylistTracksResponse = {
		"data": Track[]
	}


	export type PlaylistSearchResult = {
		"data": Playlist[]
	}


	export type TrackResponse = {
		"data": Track
	}


	export type TrackSearch = {
		"data": Track[]
	}


	export type AppNameTrailingResponse = {
		"data": AppNameTrailingMetric[]
	}


	export type AppNameTrailingMetric = {
		"count": number,
		"name": string
	}
}


import * as publicEnv from '$env/static/public'


let apiHosts
const getAPIHosts = async () => {
	return apiHosts ||= (await fetch('https://api.audius.co').then(r => r.json())).data
}

const getRandomAPIHost = async () => {
	const apiHosts = await getAPIHosts()
	if(apiHosts?.length){
		// console.log(apiHosts)
		return apiHosts[Math.floor(Math.random() * apiHosts.length)]
	}
}


const formatParams = params =>
	new URLSearchParams(
		// @ts-ignore
		Object.fromEntries(
			Object.entries(params)
				.filter(([, v]) => v !== undefined)
				.map(([k, v]) => [k.replace(/[A-Z]/g, c => '_' + c.toLowerCase()), v])
		)
	)

const makeRequest = async <T>(endpoint: string, params: any = {}) =>
	await fetch(`${await getRandomAPIHost()}${endpoint}?${`${formatParams({appName: publicEnv.PUBLIC_AUDIUS_APP_NAME, ...params})}`}`)
		.then(async response => {
			if(response.ok)
				return await response.json() as T

			if(response.headers.get('content-type').includes('application/json')){
				const json = await response.json() ?? {}
				const {message, error, success} = json
				// console.error(message || error, endpoint, params)
				throw new Error(message || (Array.isArray(error) ? error.join('\n') : error) || json)
			}
			
			const error = new DOMParser().parseFromString(await response.text(), 'text/html').documentElement.innerText.trim()
			// console.error(error, endpoint, params)
			throw new Error(error)
		})



export const searchUsers = (
	{query, onlyDownloadable}:
	{query: string, onlyDownloadable?: boolean}
) =>
	makeRequest<Audius.UserResponse>(`/v1/users/search`, {query, onlyDownloadable})
				
export const getUser = (
	{userId}:
	{userId: string}
) =>
	makeRequest<Audius.User>(`/v1/users/${userId}`)
				
export const getUserFavorites = (
	{userId}:
	{userId: string}
) =>
	makeRequest<Audius.FavoritesResponse>(`/v1/users/${userId}/favorites`)
				
export const getUserReposts = (
	{userId}:
	{userId: string}
) =>
	makeRequest<Audius.Reposts>(`/v1/users/${userId}/reposts`)
			
export const getUserTags = (
	{userId, limit}:
	{userId: string, limit?: number}
) =>
	makeRequest<Audius.FavoritesResponse>(`/v1/users/${userId}/tags`, {limit})


export const getUserTracks = (
	{userId, limit, offset, sort}:
	{userId: string, limit?: number, offset?: number, sort?: 'asc' | 'desc'}
) =>
	makeRequest<Audius.TracksResponse>(`/v1/users/${userId}/tracks`, {limit, offset, sort})


export const searchPlaylists = (
	{query, onlyDownloadable}:
	{query: string, onlyDownloadable?: boolean}
) =>
	makeRequest<Audius.PlaylistSearchResult>(`/v1/playlists/search`, {query, onlyDownloadable})


export const getPlaylist = (
	{playlistId}:
	{playlistId: string}
) =>
	makeRequest<Audius.PlaylistResponse>(`/v1/playlists/${playlistId}`, {playlistId})


export const getPlaylistTracks = (
	{playlistId}:
	{playlistId: string}
) =>
	makeRequest<Audius.PlaylistTracksResponse>(`/v1/playlists/${playlistId}/tracks`, {playlistId})


export const searchTracks = (
	{query, onlyDownloadable}:
	{query: string, onlyDownloadable?: boolean}
) =>
	makeRequest<Audius.TrackSearch>(`/v1/tracks/search`, {query, onlyDownloadable})


export const getTrendingTracks = (
	{genre, time}:
	{genre?: string, time?: 'week' | 'month' | 'allTime'}
) =>
	makeRequest<Audius.TracksResponse>(`/v1/tracks/trending`, {genre, time})


export const getTrack = (
	{trackId}:
	{trackId: string}
) =>
	makeRequest<Audius.TrackResponse>(`/v1/tracks/${trackId}`)


export const getTrackStreamURL = async (
	{trackId}:
	{trackId: string}
) =>
	`${await getRandomAPIHost()}/v1/tracks/${trackId}/stream`


export const getTrailingAppNameMetrics = (
	{timeRange}:
	{timeRange: string}
) =>
	makeRequest<Audius.AppNameTrailingResponse>(`/v1/metrics/app_name/trailing/${timeRange}`)


export const resolveFromAudiusAppURL = <T>(
	{url}:
	{url: string}
) =>
	makeRequest<T>(`/v1/resolve`, {url})