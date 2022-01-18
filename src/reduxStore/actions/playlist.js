import * as actionTypes from './actionTypes';

export const fetchPlaylistStart = () => {
	return { type: actionTypes.FETCH_PLAYLIST_START };
};

export const fetchPlaylistFail = (error) => {
	return { type: actionTypes.FETCH_PLAYLIST_FAIL, payload: error };
};

export const fetchPlaylistSuccess = (data) => {
	return {
		type: actionTypes.FETCH_PLAYLIST_SUCCESS,
		payload: data
	};
};

export const fetchPlaylist = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(fetchPlaylistStart());
		try {
			const playlists = await spotifyApi.getUserPlaylists();
			// Not sure if we need the body!
			dispatch(fetchPlaylistSuccess(playlists.body.items));
		} catch (error) {
			dispatch(fetchPlaylistFail(error));
		}
	};
};
