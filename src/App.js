import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main';
import Toggle from './components/generic/toggle/Toggle';
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./useDarkMode";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import Header from "./components/common/Header";


const App = () => {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;
	const toggle = <Toggle theme={theme} toggleTheme={toggleTheme} />;

	return (
		<BrowserRouter>
		<ThemeProvider theme={themeMode}>
			<GlobalStyles />
				<div className="container">
					<Header toggle={toggle} />
					<Main />
				</div>
		</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
