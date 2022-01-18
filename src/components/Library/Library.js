import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { connect } from 'react-redux';

function Library({ playlists, loading }) {
	console.log(playlists);
	const renderPlaylistItems = () => {
		if (loading) return [1, 2, 3, 4, 5, 6].map((e, i) => <PlaylistItem key={i} loading={true} />);
		return playlists.map((playlist, i) => <PlaylistItem {...playlist} key={i} />);
	};

	return (
		<Box
			className="Library"
			sx={{
				display: { xs: 'block', md: 'none' },
				background: 'black',
				minHeight: '100vh',
				padding: '30px 16px'
			}}
		>
			<Typography variant="h1" sx={{ color: 'text.primary' }}>
				Ditt bibliotek
			</Typography>
			<List>{renderPlaylistItems()}</List>
		</Box>
	);
}

const mapState = (state) => {
	return {
		playlists: state.playlist.items,
		loading: state.playlist.loading
	};
};

export default connect(mapState)(Library);
