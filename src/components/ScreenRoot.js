import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import { ROUTES } from '../routes/routes';
import SideNav from './SideNav/SideNav';
import MobileNav from './MobileNav/MobileNav';
import Player from './Player/Player';
import Login from './Login/Login';
import { getAccessToken } from '../login-to-spotify';

const spotifyApi = new SpotifyWebApi();

// Spotify device connect
const setupSpotifyConnect = (token, setDeviceId) => {
	const player = new window.Spotify.Player({
		name: 'Web Playback SDK Quick Start Player',
		getOAuthToken: (cb) => {
			cb(token);
		},
		volume: 0.5
	});

	// Ready
	player.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);
		setDeviceId(device_id);

		spotifyApi.transferMyPlayback([device_id]);
	});

	// Not Ready
	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	player.addListener('initialization_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('authentication_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('account_error', ({ message }) => {
		console.error(message);
	});

	player.connect();
};

const ScreenRoot = () => {
	const [accessToken, setAccessToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [deviceId, setDeviceId] = useState();

	useEffect(() => {
		const token = getAccessToken();
		setAccessToken(token);
		spotifyApi.setAccessToken(token);

		window.onSpotifyWebPlaybackSDKReady = () => {
			setupSpotifyConnect(token, setDeviceId);
		};

		if (token) {
			const getData = async () => {
				const me = await spotifyApi.getMe();
				setCurrentUser(me.body);

				const playlists = await spotifyApi.getUserPlaylists();
				setPlaylists(playlists.body.items);

				const devices = await spotifyApi.getMyDevices();
				console.log('devices: ', devices.body);
			};

			getData();
		}
	}, []);

	if (accessToken) {
		return (
			<Router>
				<Box sx={{ paddingBottom: { xs: '146px', md: '90px' } }}>
					<Switch>
						{ROUTES.map((route, i) => (
							<Route
								key={i}
								path={route.path}
								exact={route.exact}
								render={(props) => <route.component spotifyApi={spotifyApi} {...props} />}
							/>
						))}
					</Switch>
					<SideNav playlists={playlists} />
				</Box>
				<Player
					spotifyApi={spotifyApi}
					deviceId={deviceId}
					image={'/Justin-Bieber.png'}
					title={'Peaches'}
					artist={'Justin Bieber'}
				/>
				<MobileNav />
			</Router>
		);
	} else {
		return <Login />;
	}
};

export default ScreenRoot;
