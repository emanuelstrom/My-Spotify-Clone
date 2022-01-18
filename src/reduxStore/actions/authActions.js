import * as actionTypes from './actionTypes';
import { getAccessToken } from '../../login-to-spotify';

// Token
const fetchTokenStart = () => {
	return { type: actionTypes.AUTH_START };
};

const fetchTokenFail = (error) => {
	return { type: actionTypes.AUTH_FAIL, payload: error };
};

const fetchTokenSuccess = (data) => {
	return { type: actionTypes.AUTH_SUCCESS, payload: data };
};

export const fetchToken = () => {
	return async (dispatch) => {
		dispatch(fetchTokenStart());
		try {
			const token = getAccessToken();
			dispatch(fetchTokenSuccess(token));
		} catch (error) {
			dispatch(fetchTokenFail(error));
		}
	};
};

// User
const fetchUserStart = () => {
	return { type: actionTypes.FETCH_CURRENT_USER_START };
};

const fetchUserFail = (error) => {
	return { type: actionTypes.FETCH_CURRENT_USER_FAIL, payload: error };
};

const fetchUserSuccess = (data) => {
	return { type: actionTypes.FETCH_CURRENT_USER_SUCCESS, payload: data };
};

export const fetchUser = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(fetchUserStart());
		try {
			const me = await spotifyApi.getMe();
			dispatch(fetchUserSuccess(me));
		} catch (error) {
			dispatch(fetchUserFail(error));
		}
	};
};
