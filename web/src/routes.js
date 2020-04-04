import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewTasks from './pages/NewTasks';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon}/>
				<Route path="/register" component={Register}/>
				<Route path="/profile" exact component={Profile}/>
				<Route path="/profile/tasks/new" component={NewTasks}/>
			</Switch>
		</BrowserRouter>
	);
}