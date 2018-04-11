import React from 'react';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';
import './Users.css'

class Users extends React.Component{

	constructor(){
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		const { dispatch } = this.props;
		let path  = this.props.location.pathname.split('/');
		if(path[1] == 'users' && path.length == 3)
			this.props.getUserInfo(path[2]);
	    	//dispatch(userActions.getUserInfo(path[2]));
	}

	handleClick(e){
		const { name } = e.target;
		console.log(name);
		if(name == "post-project"){
			history.push('/post-project')
		}
	}

	logout(event){
		event.preventDefault();
		this.props.logout();
	}

	render(){
		const { authentication, user } = this.props;
		console.log("authentication", authentication);
		console.log("user ", user);
		let infoEle = null;
		if(user.user && user.user.data){
			infoEle = <div class="container">
						    <div class="row"><div class="col-sm-3"></div>
						        <div class="col-sm-6">
						            <div class="well well-sm">
						                <div class="row">
						                    <div class="col-sm-6">
						                        <img src="http://placehold.it/380x500" alt="" class="img-rounded img-responsive" />
						                    </div>
						                    <div class="col-sm-6">
						                        <h4>{user.user.data.name}</h4>
						                        <p>
						                            <i class="glyphicon glyphicon-envelope"></i>{user.user.data.email}
						                            <br />
						                            <i class="glyphicon glyphicon-earphone"></i>{user.user.data.phone}
						                        </p>
						                        <p>
						                        	<label>About me: </label><br/>
						                        	{user.user.data.aboutme}
						                        </p>
						                        <p>
						                        	<label>Skills: </label><br/>
						                        	{user.user.data.skills}
						                        </p>
						                    </div>
						                </div>
						            </div>
						        </div><div class="col-sm-3"></div>
						    </div>
						</div>
		}

		return (
		<div>
			<nav class="navbar navbar-default">
			  <div class="container">
			    <div class="navbar-header">
			      <a  href="/"><img class="navbar-brand" src="https://cdn6.f-cdn.com\/build\/icons\/fl-logo.svg"/></a>
			    </div>
			    <button class="btn btn-primary navbar-btn navbar-right" name="logout" onClick={this.logout.bind(this)}>Log out</button>
			    <ul class="nav navbar-nav navbar-right">
			      <li class="dropdown">
			        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
			        <span class="glyphicon glyphicon-user"></span></a>
			        <ul class="dropdown-menu">
			          <li><a href="/update-profile">Update My Profile</a></li>
			          <li><a href={"/users/" + authentication.username}>View My Profile</a></li>
			        </ul>
			      </li>
			    </ul>
			    <button class="btn btn-warning navbar-btn navbar-right" name="post-project" onClick={this.handleClick}>post-project</button>
			    <button class="btn btn-primary navbar-btn" name="dashboard" onClick={this.handleClick}>dashboard</button>
			  </div>
			</nav>
			<div>
				{infoEle}
			</div>
		</div>
		);
	}
}


function mapStateToProps(state) {
    const { user, authentication } = state;
    return {
        user, 
        authentication
    };
}
function mapDispatchToProps(dispatch){
	return{
		getUserInfo : (username) => dispatch(userActions.getUserInfo(username)),
		logout : () => dispatch(userActions.logout())
	};
}

const ConnectedUsersPage = connect(mapStateToProps, mapDispatchToProps)(Users);
export default ConnectedUsersPage;