// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'b142342349dc4e00bae810bf56fddf20';
const redirectUri = 'https://emanuel-spotify.herokuapp.com/';
const scopes = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-top-read',
	'user-modify-playback-state',
	'streaming'
];

export const getAccessToken = () => {
	const params = new URLSearchParams(window.location.hash.replace('#', '?'));
	return params.get('access_token');
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}&response_type=token&show_dialog=true`;
