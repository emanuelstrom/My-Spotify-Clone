import * as actionTypes from './actionTypes';

export const play = () => {
	return { type: actionTypes.PLAY };
};

export const pause = () => {
	return { type: actionTypes.PAUSE };
};

export const setProgress = (progress) => {
	return { type: actionTypes.SET_PROGRESS, payload: progress };
};

export const addDeviceId = (device_id) => {
	return { type: actionTypes.ADD_DEVICE_ID, payload: device_id };
};

export const updatePlayerStart = () => {
	return { type: actionTypes.UPDATE_PLAYER_START };
};

export const updatePlayerFail = (error) => {
	return { type: actionTypes.UPDATE_PLAYER_FAIL, payload: error };
};

export const updatePlayerSuccess = (payload) => {
	return { type: actionTypes.UPDATE_PLAYER_SUCCESS, payload: payload };
};

export const playNewSong = (spotifyApi, song = {}) => {
	return async (dispatch) => {
		dispatch(updatePlayerStart());
		try {
			await spotifyApi.play(song);
			const data = await getMyCurrentPlayingTrack(spotifyApi);
			dispatch(updatePlayerSuccess(data));
			dispatch(play());
		} catch (error) {
			dispatch(updatePlayerFail(error));
		}
	};
};

export const updateSongInfo = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(updatePlayerStart());
		try {
			const data = await getMyCurrentPlayingTrack(spotifyApi);
			dispatch(updatePlayerSuccess(data));
		} catch (error) {
			dispatch(updatePlayerFail(error));
		}
	};
};

export const updateSongInfoStart = (spotifyApi) => {
	return async (dispatch, getState) => {
		dispatch(updatePlayerStart());
		try {
			const state = getState();
			const { token } = state.auth;
			await spotifyApi.setAccessToken(token);
			const song = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
			const item = song.body.items[0].track;
			const duration = item.duration_ms / 1000;
			const data = {
				title: item.name,
				image: item.album.images[1],
				artist: item.artists[0].name,
				duration,
				progress: 0
			};
			dispatch(updatePlayerSuccess(data));
		} catch (error) {
			dispatch(updatePlayerFail(error));
		}
	};
};

const getMyCurrentPlayingTrack = async (spotifyApi) => {
	const currentSong = await spotifyApi.getMyCurrentPlayingTrack();
	const item = currentSong.body.item;
	const duration = item.duration_ms / 1000;
	const progress = currentSong.body.progress_ms / 1000;
	return {
		title: item.name,
		image: item.album.images[1],
		artist: item.artists[0].name,
		duration,
		progress
	};
};
