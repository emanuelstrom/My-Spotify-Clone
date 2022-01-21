import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';

function SideNavOption({ name, id }) {
	const [isPageActive, setIsPageActive] = useState(false);

	return (
		<ListItem disablePadding>
			<ListItemButton
				component={NavLink}
				to={`/playlist/${id}`}
				isActive={(match) => {
					setIsPageActive(!!match);
				}}
			>
				<ListItemText primary={name} sx={{ color: isPageActive ? 'primary.main' : 'text.secondary' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default SideNavOption;
