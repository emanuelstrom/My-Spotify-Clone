import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as actions from './actions/index';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({});

const configureStore = () => {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

	// Fetch the products
	store.dispatch(actions.fetchProducts());

	return store;
};

export default configureStore;
