import { TableCell, TableRow, Avatar, Typography, Skeleton, Box } from '@mui/material';

const SongRow = ({ spotifyApi, playlistId, track, index, loading }) => {
	const image = track.album.images[2].url;
	const title = track.name;
	const artist = track.artists[0].name;
	const album = track.album.name;
	const duration = track.duration_ms / 1000;

	const Title = () => {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
				<Avatar alt={album} src={image} variant="square" />
				<Box ml={2}>
					<Typography variant="subtitle1">{title}</Typography>
					<Typography variant="body1" sx={{ color: 'text.secondary' }}>
						{artist}
					</Typography>
				</Box>
			</Box>
		);
	};

	const formatTime = (duration) => {
		const songDuration = Math.floor(duration / 60);
		const rest = (duration % 60).toFixed(0);
		//const even = duration % 2 === 0;

		const min = songDuration === 0 ? `0` : songDuration;
		const sec = rest < 10 ? `0${rest}` : rest;

		return `${min}:${sec}`;
	};

	return (
		<TableRow
			key={index}
			sx={{
				cursor: 'pointer',
				'& td': { border: 0 },
				'&:hover': { backgroundColor: '#d8d8d821 !important' }
			}}
			hover={true}
			onClick={() =>
				spotifyApi.play({
					context_uri: `spotify:playlist:${playlistId}`,
					offset: {
						position: index
					}
				})
			}
		>
			<TableCell>{loading ? <Skeleton variant="rectangular" width={20} height={30} /> : index + 1}</TableCell>
			<TableCell>{loading ? <Skeleton variant="rectangular" width={50} height={50} /> : <Title />}</TableCell>
			<TableCell align="right">
				{' '}
				{loading ? <Skeleton variant="rectangular" width={50} height={30} /> : album}
			</TableCell>
			<TableCell align="right">
				{' '}
				{loading ? <Skeleton variant="rectangular" width={20} height={30} /> : formatTime(duration)}
			</TableCell>
		</TableRow>
	);
};

export default SongRow;
