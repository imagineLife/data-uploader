import React from 'react';
import { AppProvider } from './context';
import App from './App';

const WrappedApp = () => (
	<AppProvider>
		<App />
	</AppProvider>
)
export default WrappedApp;