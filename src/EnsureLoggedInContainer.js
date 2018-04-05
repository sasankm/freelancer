import React from 'react';

import { connect } from 'react-redux';
import { userActions } from './_actions';
import { Redirect }  from 'react-router-dom';
import { history } from './_helpers/history';
import ConnectedHomePage from './HomePage/HomePage.js'

class EnsureLoggedIn extends React.Component {

	componentDidMount() {
	    const { dispatch, authentication } = this.props;
	    dispatch(userActions.isUserLoggedIn());
	}


	render() {

		const { loggedIn, processing } = this.props.authentication;
		let children = this.props.children;
		console.log("EnsureLoggedIn ", loggedIn);
	    if (loggedIn) {
	    	console.log("returning home", window.location.pathname)
	    	return {children};
	    } else if(loggedIn == false){
	    	console.log("REturnning login");
	    	return (
	    		<Redirect to="/login"/>
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

const EnsureLoggedInContainer = connect(mapStateToProps)(EnsureLoggedIn);
export default EnsureLoggedInContainer;