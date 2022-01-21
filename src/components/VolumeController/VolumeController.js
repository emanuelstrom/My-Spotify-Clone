import { Box, Stack, Slider } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

const VolumeController = ({ spotifyApi }) => {
	const defaultVolume = 50;
	const [volume, setVolume] = useState(defaultVolume);

	const handleVolumeChange = (e, v) => {
		// spotifyApi.setVolume(v);
		debouncedApiCall(v);
	};

	const debouncedApiCall = useMemo(
		(v) =>
			debounce(async (v) => {
				await spotifyApi.setVolume(v);
			}, 1),
		[volume, setVolume]
	);

	useEffect(() => {
		spotifyApi.setVolume(defaultVolume);
		return () => {
			debouncedApiCall.cancel();
		};
	}, []);

	return (
		<Box sx={{ width: '100%', maxWidth: '300px', marginRight: '10px' }}>
			<Stack spacing={2} direction="row" alignItems="center">
				{volume === 0 ? <VolumeOff sx={{ color: 'white' }} /> : <VolumeDown sx={{ color: 'white' }} />}
				<Slider
					min={0}
					max={100}
					color="secondary"
					step={1}
					aria-label="Volume"
					value={volume}
					onChange={(e, v) => setVolume(v)}
					onChangeCommitted={handleVolumeChange}
				/>
				<VolumeUp sx={{ color: 'white' }} />
			</Stack>
		</Box>
	);
};

export default VolumeController;
