import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { setProgress } from '../../reduxStore/actions/index';
import debounce from 'lodash.debounce';
import { Stack, Typography, Slider } from '@mui/material';

const sliderStyle = {
	color: '#fff',
	height: 4,
	width: { xs: 100, md: 250 },
	'& .MuiSlider-thumb': {
		width: 8,
		height: 8,
		transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
		'&:before': {
			boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)'
		},
		'&:hover, &.Mui-focusVisible': {
			boxShadow: `0px 0px 0px 8px 'rgb(0 0 0 / 16%)`
		},
		'&.Mui-active': {
			width: 20,
			height: 20
		}
	},
	'& .MuiSlider-rail': {
		opacity: 0.28
	}
};

const SongProgress = ({ progress, duration, setProgress, spotifyApi, playing }) => {
	useEffect(() => {
		let interval = null;
		if (playing) {
			interval = setInterval(() => {
				setProgress(progress + 1);
			}, 1000);
		} else if (!playing && progress !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [playing, progress]);

	const formatTime = (value) => {
		const rest = (value % 60).toFixed(0);
		const min = Math.floor(value / 60);
		const seconds = rest < 10 ? `0${rest}` : rest;
		return `${min}:${seconds}`;
	};

	// 1. Wrap api call to spotify so we can log the value
	const apiCall = (v) => {
		spotifyApi.seek(v * 1000);
	};

	// 2. Create a callback function that we will send to useMemo();
	const debouncedApiCall = (v) => {
		// 3. Return a debounced version of apiCall()
		return debounce(apiCall, 1, {
			leading: false,
			trailing: true
		});
	};

	// 4. Store the value of our memoized function in a function/variable called progressSong
	const progressSong = useMemo(debouncedApiCall, []);

	const handleOnChange = (e, v) => {
		setProgress(v);

		// 5. Call the memoized function that in turn uses a debounced version of apiCall();
		progressSong(v);
	};

	return (
		<Stack spacing={2} direction="row" alignItems="center">
			<Typography variant="body1" sx={{ color: 'text.secondary' }}>
				{formatTime(progress)}
			</Typography>
			<Slider
				min={0}
				max={duration}
				sx={sliderStyle}
				size="medium"
				value={progress}
				aria-label="Default"
				onChange={(e, v) => setProgress(v)}
				onChangeCommitted={handleOnChange}
			/>
			<Typography variant="body1" sx={{ color: 'text.secondary' }}>
				{formatTime(duration)}
			</Typography>
		</Stack>
	);
};

const mapState = (state) => {
	const { progress, duration, playing } = state.player;
	return {
		progress,
		duration,
		playing
	};
};

const mapDispatch = (dispatch) => {
	return {
		setProgress: (p) => dispatch(setProgress(p))
	};
};

export default connect(mapState, mapDispatch)(SongProgress);
