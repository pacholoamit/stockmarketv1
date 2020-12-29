import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import MainInput from './components/MainInput';
import InformationPage from './components/InformationPage/InformationPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Footer from './components/footer';
import { AuthProvider } from './components/context/AuthContext';
import DashBoardPage from './components/DashboardPage/DashBoardPage';
import PrivateRoute from './components/PrivateRoute';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPassword';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0aa793',
		},
	},
});

function App(props) {
	return (
		
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<Router>
						<div className='App'>
							<MainInput className='MainInputComponent' />

							<Switch>
								<Route path='/' exact component={MainPage} />
								<Route path={`/symbol/:symbol`} component={InformationPage} />
								<Route path={'/login'} component={LoginPage} />
								<Route path={'/signup'} component={SignUpPage} />
								<Route path={'/forgot-password'} component={ForgotPasswordPage} />
						
								<PrivateRoute path={'/dashboard'} component={DashBoardPage} />
							</Switch>
							<Footer />
						</div>
					</Router>
				</ThemeProvider>
			</AuthProvider>

	);
}

export default App;
