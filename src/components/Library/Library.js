import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PlaylistItem from '../PlaylistItem/PlaylistItem';

const mockData = [
	{ name: 'Rock', playlistId: 123, image: '/Justin-Bieber.png' },
	{ name: 'Pop', playlistId: 646, image: '/Justin-Bieber.png' },
	{ name: 'Hip hop', playlistId: 834, image: '/Justin-Bieber.png' },
	{ name: 'X-mas', playlistId: 5503, image: '/Justin-Bieber.png' },
	{ name: 'Code life', playlistId: 4832, image: '/Justin-Bieber.png' }
];

function Library({ playlists = mockData }) {
	const renderPlaylistItems = () => {
		if (!playlists) return 'Loading';
		return playlists.map((playlist) => <PlaylistItem {...playlist} />);
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

export default Library;
