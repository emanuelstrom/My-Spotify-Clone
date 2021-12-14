import { createTheme } from '@mui/material/styles';

const h1 = { fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '30px' };
const h2 = { fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '20px', lineHeight: '24px' };
const h3 = { fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '17px', lineHeight: '20px' };
const h4 = { fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px' };

export const mainTheme = createTheme({
	palette: {},
	typography: {
		fontFamily: [
			'Roboto',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		h1,
		h2,
		h3,
		h4
	}
});
