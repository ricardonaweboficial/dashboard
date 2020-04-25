import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';

import Profile from './pages/Profile';
import User from './pages/User';
import NewTasks from './pages/NewTasks';
import EditionTasks from './pages/EditionTasks';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon}/>
				<Route path="/register" component={Register}/>
				<Route path="/profile" exact component={Profile}/>
				<Route path="/profile/user" component={User}/>
				<Route path="/profile/tasks/new" component={NewTasks}/>
				<Route path="/profile/tasks/edition/:id" component={EditionTasks}/>

			</Switch>
		</BrowserRouter>
	);
}