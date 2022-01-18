import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './reduxStore/configureStore';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from '@mui/system';
import { mainTheme } from './style/material-themes';
console.log(mainTheme);

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={mainTheme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
