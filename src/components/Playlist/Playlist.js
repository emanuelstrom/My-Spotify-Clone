import { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	Grid,
	Fab,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongRow from '../SongRow/SongRow';

const Playlist = ({ spotifyApi }) => {
	const { playlistId } = useParams();
	const [playlistInfo, setPlaylistInfo] = useState();
	const [songs, setSongs] = useState([]);

	// api som använder playlistId

	useEffect(() => {
		const getData = async () => {
			const playlistDetails = await spotifyApi.getPlaylist(playlistId);
			setPlaylistInfo({
				image: playlistDetails.body.images[0].url,
				name: playlistDetails.body.name
			});

			const allSongs = await spotifyApi.getPlaylistTracks(playlistId);
			setSongs(allSongs.body.items);
		};
		getData();
	}, [playlistId]);

	const renderSongRows = () => {
		if (!songs) return [1, 2, 3, 4, 5, 6].map((e, i) => <SongRow loading={true} key={i} />);
		return songs.map((song, i) => (
			<SongRow spotifyApi={spotifyApi} playlistId={playlistId} {...song} key={i} index={i} />
		));
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
					<Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 6 }}>
						Playlist
					</Typography>
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
					<TableContainer>
						<Table size="small" padding="none">
							<TableHead sx={{ display: { xs: 'none', md: 'table-header-group' } }}>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Title</TableCell>
									<TableCell align="right">Album</TableCell>
									<TableCell align="right">Duration</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>{renderSongRows()}</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Playlist;
