import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as actions from './actions/index';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer.js';
import playlistReducer from './reducers/playlistReducer.js';
import playerReducer from './reducers/playerReducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ auth: authReducer, playlist: playlistReducer, player: playerReducer });

const configureStore = () => {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

	// Fetch the token
	store.dispatch(actions.fetchToken());

	return store;
};

export default configureStore;
