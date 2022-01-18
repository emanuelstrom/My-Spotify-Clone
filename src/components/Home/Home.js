import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Home = () => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: '20px 0 20px 0'
				}}
			>
				<Typography variant="h1" sx={{ color: 'text.primary' }}>
					Welcome to my Spotify Clone!
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
				<Typography variant="paragraph" sx={{ color: 'text.primary' }}>
					This app was created using React and Redux.
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
				<Typography variant="paragraph" sx={{ color: 'text.primary' }}>
					I've been using Spotify's API to connect you securely with this app.
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '150px' }}>
				<Typography variant="paragraph" sx={{ color: 'text.primary' }}>
					Styled with{' '}
					<Link target="_blank" href="http://mui.com/">
						materialUI
					</Link>
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
				<img src="/Emanuel.jpg" alt="Emanuel Ström" style={{ width: '250px', borderRadius: '50%' }} />
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography variant="paragraph" sx={{ color: 'text.primary' }}>
					Created by{' '}
					<Link target="_blank" href="http://emanuelstromportfolio.herokuapp.com/">
						Emanuel Ström
					</Link>
				</Typography>
			</Box>
		</>
	);
};

export default Home;
