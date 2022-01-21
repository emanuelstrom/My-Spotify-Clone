import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const style = {
	position: 'fixed',
	top: 0,
	right: 0,
	height: '100vh',
	width: { xs: '100%', md: 'calc(100% - 240px)', xl: '100%' }
};

const Home = () => {
	return (
		<Box sx={style} className="gradient-animation">
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: '20px 0 20px 0'
				}}
			>
				<Typography
					variant="h1"
					align="center"
					sx={{
						color: 'text.primary',
						margin: '0 auto'
					}}
				>
					Welcome to my Spotify Clone!
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
				<Typography align="center" variant="paragraph" sx={{ color: 'text.primary' }}>
					This app was created using React and Redux.
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
				<Typography align="center" variant="paragraph" sx={{ color: 'text.primary' }}>
					I've been using Spotify's API to connect you securely with this app.
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '150px' }}>
				<Typography align="center" variant="paragraph" sx={{ color: 'text.primary' }}>
					Styled with{' '}
					<Link target="_blank" href="http://mui.com/">
						materialUI
					</Link>
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
				<img
					src="/Emanuel.jpg"
					alt="Emanuel Ström"
					style={{ width: '250px', borderRadius: '50%', boxShadow: '0px 0px 55px 9px rgba(0,0,0,0.3)' }}
				/>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography align="center" variant="paragraph" sx={{ color: 'text.primary' }}>
					Created by{' '}
					<Link target="_blank" href="http://emanuelstromportfolio.herokuapp.com/">
						Emanuel Ström
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Home;
