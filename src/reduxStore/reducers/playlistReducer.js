import * as actionTypes from '../actions/actionTypes';

const initialState = {
	loading: false,
	error: null,
	items: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PLAYLIST_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.FETCH_PLAYLIST_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				items: action.payload
			};
		case actionTypes.FETCH_PLAYLIST_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
};

export default reducer;
