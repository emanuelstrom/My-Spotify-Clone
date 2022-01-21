import { useState } from 'react';
import { Box, InputBase, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableOfSongs from '../TableOfSongs/TableOfSongs';

const boxStyle = {
	minHeight: 'calc(100vh - 90px)',
	bgcolor: 'background.paper',
	color: 'white',
	padding: '30px',
	paddingLeft: { md: '300px', sm: '30px' }
};

const Search = ({ spotifyApi }) => {
	const [songs, setSongs] = useState(null);
	const [loading, setLoading] = useState(false);

	const formatSongData = (tracks) => {
		return tracks.map((track) => {
			return { track: { ...track, contextUri: track.album.uri, position: track.track_number - 1 } };
		});
	};

	const handleOnChange = async (e) => {
		setLoading(true);
		const { value } = e.target;

		if (value === '') {
			setSongs(null);
			setLoading(false);
			return;
		}

		try {
			const result = await spotifyApi.searchTracks(value);
			const { items } = result.body.tracks;
			const formattedSong = formatSongData(items);
			setSongs(formattedSong);
			setLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Box sx={boxStyle}>
			<form
				onSubmit={(e) => e.preventDefault()}
				style={{
					borderRadius: 50,
					padding: '6px, 20px',
					display: 'flex',
					alignItems: 'center',
					width: 250,
					backgroundColor: 'white',
					color: 'black'
				}}
			>
				<SearchIcon fontSize="large" sx={{ color: 'text.secondary', marginRight: '6px' }} />
				<InputBase
					id="outlined-basic"
					color="black"
					label="Songs or Artists"
					variant="outlined"
					sx={{ color: '#000' }}
					onChange={handleOnChange}
				/>
			</form>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					{songs === null ? (
						<Typography>Search for Songs</Typography>
					) : (
						<TableOfSongs loading={loading} spotifyApi={spotifyApi} playlistId={false} songs={songs} />
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Search;
