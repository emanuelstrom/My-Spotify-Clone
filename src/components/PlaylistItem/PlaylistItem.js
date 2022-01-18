import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@mui/material';

function PlaylistItem({ name, id, images, loading }) {
	const history = useHistory();
	if (loading)
		return (
			<ListItem disablePadding>
				<ListItemButton onClick={() => history.push(`/playlist/${id}`)}>
					<ListItemAvatar sx={{ marginRight: '15px' }}>
						<Skeleton variant="rectangular" width={60} height={60} />
					</ListItemAvatar>
					<Skeleton variant="text" width={80} height={20} animation="wave" />
				</ListItemButton>
			</ListItem>
		);

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => history.push(`/playlist/${id}`)}>
				<ListItemAvatar>
					<Avatar
						alt={name}
						src={images.length > 2 ? images[2].url : images[0].url}
						variant="square"
						sx={{ height: 60, width: 60, marginRight: '15px' }}
					/>
				</ListItemAvatar>
				<ListItemText primary={name} sx={{ color: 'text.secondary' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default PlaylistItem;
