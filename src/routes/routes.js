import Library from '../components/Library/Library';
import Playlist from '../components/Playlist/Playlist';
import Home from '../components/Home/Home';

const NoMatch = () => {
	return <div>404</div>;
};

const Search = () => {
	return <div>Search</div>;
};

export const ROUTES = [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/playlist',
		exact: true,
		component: Library
	},
	{
		path: '/playlist/:playlistId',
		exact: true,
		component: Playlist
	},
	{
		path: '/search',
		exact: true,
		component: Search
	},
	{
		path: '*',
		exact: true,
		component: NoMatch
	}
];
