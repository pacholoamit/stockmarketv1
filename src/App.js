import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import MainInput from './components/MainInput';
import InformationPage from './InformationPage';

function App(props) {
	return (
		<Router>
			<div className='App'>
				<MainInput className='MainInputComponent' />
				<Switch>
					<Route path='/' exact component={MainPage} />
					<Route path={`/symbol/:symbol`} component={InformationPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
