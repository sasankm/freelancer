import React from 'react';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';

class UpdateProfile extends React.Component{

	constructor(){
		super();

		this.state = {
			name: "",
			email: "",
			phone: "",
			aboutme: "",
			skills: ""
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

		const { dispatch } = this.props;
		dispatch(userActions.updateProfile(this.state));
	}

	handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);
        this.setState({ [name]: value });
    }

	handleClick(e){
		const { name } = e.target;
		console.log(name);
		if(name == "post-project"){
			history.push('/post-project')
		}
		else if(name == "dashboard"){
			history.push('/dashboard')
		}
	}

	render(){
		const { user } = this.props;
		console.log("user", user);

		return (
			<div>
			<nav class="navbar navbar-default">
			  <div class="container">
			    <div class="navbar-header">
			      <a  href="/"><img class="navbar-brand" src="https://cdn6.f-cdn.com\/build\/icons\/fl-logo.svg"/></a>
			    </div>
			    <button class="btn btn-primary navbar-btn navbar-right" name="logout" onClick={this.handleClick}>Log out</button>
			    <ul class="nav navbar-nav navbar-right">
			      <li class="dropdown">
			        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
			        <span class="glyphicon glyphicon-user"></span></a>
			        <ul class="dropdown-menu">
			          <li><a href="/update-profile">Update My Profile</a></li>
			          <li><a href="/users">View My Profile</a></li>
			        </ul>
			      </li>
			    </ul>
			    <button class="btn btn-primary navbar-btn navbar-right" name="post-project" onClick={this.handleClick}>post-project</button>
			    <button class="btn btn-primary navbar-btn" name="dashboard" onClick={this.handleClick}>dashboard</button>
			  </div>
			</nav>
			<div class="container">
			<div class="row"><div class="col-sm-4"></div><div class="col-sm-4">
			<form onSubmit={this.handleSubmit}>
				<div class="form-group">
				    <label for="name">Name :</label>
				    <input onChange={this.handleChange} class="form-control" name="name" id="name"/>
				  </div>
				<div class="form-group">
				    <label for="email">Email address:</label>
				    <input onChange={this.handleChange} type="email" class="form-control" name="email" id="email"/>
				  </div>
				  <div class="form-group">
				    <label for="phone">Phone Number :</label>
				    <input onChange={this.handleChange} class="form-control" name="phone" id="name"/>
				  </div>
				  <div class="form-group">
				    <label for="aboutme">About Me :</label>
				    <textarea onChange={this.handleChange} rows="4" class="form-control" name="aboutme" id="name"/>
				  </div>
				  <div class="form-group">
				    <label for="skills">Skills :</label>
				    <textarea onChange={this.handleChange} rows="2" class="form-control" name="skills" id="name"/>
				  </div>
			  	<button type="submit" class="center-block btn btn-primary">Update</button>
			</form>
			</div><div class="col-sm-4"></div></div></div>
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

const ConnectedUpdateProfilePage = connect(mapStateToProps)(UpdateProfile);
export default ConnectedUpdateProfilePage;
