import { TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material';
import SongRow from '../SongRow/SongRow';

export default function TableOfSongs({ loading, spotifyApi, playlistId, songs }) {
	const renderSongRows = () => {
		if (loading) return [1, 2, 3, 4, 5, 6].map((e, i) => <SongRow loading={true} key={i} />);
		return songs.map((song, i) => (
			<SongRow spotifyApi={spotifyApi} playlistId={playlistId} {...song} key={i} index={i} />
		));
	};
	return (
		<div>
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
		</div>
	);
}
