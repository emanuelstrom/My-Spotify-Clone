import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from '@mui/system';
import { mainTheme } from './style/material-themes';
console.log(mainTheme);

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={mainTheme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
