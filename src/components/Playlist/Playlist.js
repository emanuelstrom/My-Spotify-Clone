import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Fab } from '@mui/material';
import { useParams } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { connect } from 'react-redux';
import TableOfSongs from '../TableOfSongs/TableOfSongs';

const Playlist = ({ spotifyApi, loading }) => {
	const { playlistId } = useParams();
	const [playlistInfo, setPlaylistInfo] = useState();
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const playlistDetails = await spotifyApi.getPlaylist(playlistId);
			setPlaylistInfo({
				image: playlistDetails.body.images[0].url,
				name: playlistDetails.body.name
			});

			const allSongs = await spotifyApi.getPlaylistTracks(playlistId);
			const formattedSongs = formatSongData(allSongs.body.items);
			setSongs(formattedSongs);
		};
		getData();
	}, [playlistId]);

	const formatSongData = (songsInPlaylist) => {
		return songsInPlaylist.map((song, i) => {
			const { track } = song;
			track.contextUri = `spotify:playlist:${playlistId}`;
			track.position = i;
			return { track };
		});
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				padding: '30px',
				paddingLeft: { md: '300px', sm: '30px' },
				minHeight: '100vh'
			}}
		>
			{/* Hero */}
			<Grid container spacing={2} mb={6}>
				<Grid item sm={12} lg={2}>
					<img src={playlistInfo ? playlistInfo.image : ''} alt="1" style={{ width: '100%' }} />
				</Grid>
				<Grid
					item
					sm={12}
					lg={10}
					sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
				>
					<Typography variant="h1" sx={{ color: 'text.primary' }}>
						{playlistInfo ? playlistInfo.name : ''}
					</Typography>
				</Grid>
			</Grid>
			{/* Song list */}
			<Grid container spacing={2}>
				<Grid item sm={12} lg={2}>
					<Fab color="primary" aria-label="play">
						<PlayArrowIcon sx={{ color: 'text.primary' }} fontSize="large" />
					</Fab>
				</Grid>
				<Grid item sm={12}>
					<TableOfSongs loading={loading} spotifyApi={spotifyApi} playlistId={playlistId} songs={songs} />
				</Grid>
			</Grid>
		</Box>
	);
};

const mapState = (state) => {
	return {
		loading: state.playlist.loading
	};
};
export default connect(mapState)(Playlist);
