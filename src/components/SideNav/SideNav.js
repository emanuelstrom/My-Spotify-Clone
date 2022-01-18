import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SideNavOption from '../SideNavOption/SideNavOption';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';

// playlists = [{},{}]
function SideNav({ items, loading }) {
	const history = useHistory();

	const renderPlaylists = () => {
		// Make sure laoding state works
		if (loading)
			return (
				<Box sx={{ width: '80%', marginLeft: '15px' }}>
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
					<Skeleton sx={{ marginTop: '10px' }} />
				</Box>
			);
		return items.map((playlist, i) => <SideNavOption {...playlist} key={i} />);
	};

	return (
		<Box
			className="SideNav"
			sx={{
				position: { xs: 'unset', md: 'fixed' },
				display: { xs: 'none', md: 'block' },
				bgcolor: 'background.paper',
				height: '100vh',
				width: 240,
				top: 0,
				left: 0
			}}
		>
			<img
				style={{ marginLeft: 16, marginTop: 24, cursor: 'pointer' }}
				alt="a"
				src="/Spotify_Logo.png"
				width={130}
				onClick={() => history.push('/')}
			/>
			<Box sx={{ width: '100%', maxWidth: 360 }}>
				<List>
					<ListItem
						disablePadding
						sx={[{ color: 'text.secondary' }, { '&:hover': { color: 'text.primary' } }]}
					>
						<ListItemButton onClick={() => history.push('/')}>
							<ListItemIcon>
								<HomeIcon sx={{ color: 'text.secondary' }} />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => history.push('/search')}>
							<ListItemIcon>
								<SearchIcon sx={{ color: 'text.primary' }} />
							</ListItemIcon>
							<ListItemText
								primary="Search"
								sx={[{ color: 'text.secondary' }, { '&:hover': { color: 'text.primary' } }]}
							/>
						</ListItemButton>
					</ListItem>
				</List>
				<Divider style={{ background: 'white' }} variant="middle" />
				<List>{renderPlaylists()}</List>
			</Box>
		</Box>
	);
}

const mapState = (state) => {
	const { items, loading } = state.playlist;
	return { items, loading };
};

export default connect(mapState)(SideNav);
