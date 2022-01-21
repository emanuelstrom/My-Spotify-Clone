import { TableCell, TableRow, Avatar, Typography, Skeleton, Box } from '@mui/material';
import { connect } from 'react-redux';
import { playNewSong } from '../../reduxStore/actions/index';

const SongRow = ({ spotifyApi, track, index, loading, playNewSong, contextUri, position }) => {
	const style = {
		'& td': { border: 0 },
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#d8d8d821 !important'
		}
	};

	if (loading) {
		return (
			<TableRow key={index} sx={style} hover={true}>
				<TableCell>
					<Skeleton variant="rectangular" width={20} height={30} />
				</TableCell>
				<TableCell>
					<Skeleton variant="rectangular" width={30} height={30} />
				</TableCell>
				<TableCell align="right" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'table-cell' } }}>
					<Skeleton variant="rectangular" width={50} height={30} />
				</TableCell>
				<TableCell align="right" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'table-cell' } }}>
					<Skeleton variant="rectangular" width={20} height={30} />{' '}
				</TableCell>
			</TableRow>
		);
	}

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
		const min = songDuration === 0 ? `0` : songDuration;
		const sec = rest < 10 ? `0${rest}` : rest;

		return `${min}:${sec}`;
	};

	const onRowClick = async () => {
		const song = {
			context_uri: contextUri,
			offset: {
				position
			}
		};

		playNewSong(spotifyApi, song);
	};

	return (
		<TableRow key={index} sx={style} hover={true} onClick={onRowClick}>
			<TableCell>{index + 1}</TableCell>
			<TableCell>
				<Title />
			</TableCell>
			<TableCell align="right">{album}</TableCell>
			<TableCell align="right">{formatTime(duration)}</TableCell>
		</TableRow>
	);
};

const mapDispatch = (dispatch) => {
	return {
		playNewSong: (spotifyApi, song) => dispatch(playNewSong(spotifyApi, song))
	};
};
export default connect(null, mapDispatch)(SongRow);
