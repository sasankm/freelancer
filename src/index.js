import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectedLoginPage from './Login.js';
import ConnectedHomePage from './HomePage/HomePage';
import ConnectedSignupPage from './Signup.js';
import ConnectedPostProjectPage from './PostProject/PostProject';
import ConnectedUpdateProfilePage from './UpdateProfile/UpdateProfile';
import ConnectedUsersPage from './Users/Users';
import ConnectedProjectInfoPage from './ProjectInfo/ProjectInfo';
import ConnectedDashboardPage from './Dashboard/Dashboard';
import ConnectedHome from './Home/home';
import ConnectedProjectsHiredPage from './ProjectInfo/ProjectsHired';
import ConnectedAccountPage from './Account/account';

import { history } from './_helpers/history.js';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import EnsureLoggedOutContainer from './EnsureLoggedOutContainer'

import { store } from './_helpers/store.js';
import { Provider } from 'react-redux';
import { Router, Route, Link, Redirect } from 'react-router-dom';	

ReactDOM.render(<Provider store={store}><Router history={history}>
	<div>
		<Route path="/login" component={ConnectedLoginPage}/>
		<Route path="/signup" component={ConnectedSignupPage}/>
		<Route path="/homepage" component={ConnectedHomePage}/>
		<Route exact path="/" component={ConnectedHome} />
			<Route path="/post-project" component={ConnectedPostProjectPage}/>
			<Route path="/update-profile" component={ConnectedUpdateProfilePage}/>
			<Route path="/users/:username" component={ConnectedUsersPage}/>
			<Route path="/project/:project_id" component={ConnectedProjectInfoPage}/>
		    <Route path="/projects-hired" component={ConnectedProjectsHiredPage}/>
			<Route path="/dashboard" component={ConnectedDashboardPage}/>
        <Route path="/account" component={ConnectedAccountPage}/>
     </div>
     </Router></Provider>, document.getElementById('root'));
