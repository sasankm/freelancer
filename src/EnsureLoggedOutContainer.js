import React from 'react';

import { connect } from 'react-redux';
import { userActions } from './_actions';
import { Redirect }  from 'react-router-dom';
import { history } from './_helpers/history';
import ConnectedHomePage from './HomePage/HomePage.js'

class EnsureLoggedOut extends React.Component {

	componentDidMount() {
	    const { dispatch, authentication } = this.props;
	    dispatch(userActions.isUserLoggedIn());
	}

	render() {

		const { loggedIn, processing } = this.props.authentication;
		const { children } = this.props;
		console.log("EnsureLoggedIn ", loggedIn);
	    if (loggedIn) {
	    	console.log("returning home", window.location.pathname)
	    	return (
	    		<Redirect to="/home"/>
	    	);
	    } else if(loggedIn == false){
	    	console.log("REturnning ", window.location.pathname);
	    	return (
	    		<div>{children}</div>
	    		);
	    } else{
	    	console.log("returnnng null");
		    return (
		      	null
		    );
	    }
	}
}

function mapStateToProps(state) {
    const { user, authentication, location } = state;
    return {
        user, 
        authentication,
        location
    };
}

const EnsureLoggedOutContainer = connect(mapStateToProps)(EnsureLoggedOut);
export default EnsureLoggedOutContainer;