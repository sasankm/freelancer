import React from 'react';

import { connect } from 'react-redux';
import './HomePage.css';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';

const thStyle ={
    backgroundColor: '#428bca',
    color: 'white'
};
const sStyle ={
    width: '400px'
};
const imgStyle = {
    width: '150px',
    height : '50px'
};
function searchingFor(search){
    return function(x){
        return x.skills.toLowerCase().includes(search.toLowerCase()) || !search;
    };
}

class HomePage extends React.Component{

	constructor(){
		super();
		this.state = {
			active : null,
            search : ''
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		console.log("handle submit for bid", e.target);
	}

	handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);
        this.setState({ [name]: value });
    }

	componentDidMount(){
		//const { dispatch } = this.props;
		//dispatch(userActions.getProjectsList());
		this.props.getProjectsList();
	}

	handleClick(e){
		const { name } = e.target;
        //const { dispatch } = this.props;
		console.log(name);
		if(name == "post-project"){
			history.push('/post-project')
		}
		else if(name == "dashboard"){
			history.push('/dashboard')
		}
		else if(name == 'homepage'){
		    history.push('/homepage')
        }

	}
    logout(event){
        event.preventDefault();
        this.props.logout();
    }

    updateSearch(event){
	    this.setState({search: event.target.value.substr(0,20)});
    }

	render(){
		const { authentication, user } = this.props;
		console.log("authentication", authentication);
		console.log("projects", user.projects);
		let projectEle = null;
        let projectEle1 = null;
		if(user.projects){
			let tableBody = user.projects.projects.filter(searchingFor(this.state.search)).map( project => <tr>
									<td><label for="project-title"><a href={ "/project/" + project.project_id}>{project.title}</a></label><br/>
									<p>{project.description}</p>
									</td>
									<td><a href={"/users/" + project.username}>{project.username}</a></td>
									<td>{project.skills}</td>
									<td>NULL</td>
									<td>{project.budget}</td>
									</tr>);


			projectEle = <div class="container"><div class="col-sm-1"></div><div class="col-sm-10">
				<label>All Open Projects : </label><br/><br/>
							<table class="table">
							    <thead>
							      <tr>
							        <th style={thStyle}>Project</th>
							        <th style={thStyle}>Employer</th>
							        <th style={thStyle}>Skills Required</th>
							        <th style={thStyle}>Number of Bid yet</th>
							        <th style={thStyle}>Budget Range</th>
							      </tr>
							    </thead>
							    <tbody>
							    {tableBody}
							    </tbody>
							  </table>
						</div>
						<div class="col-sm-1"></div></div>
            let tableBody1 = user.projects.projects.filter(searchingFor(this.state.search)).map( project => <tr>
                <td><label for="project-title"><a href={ "/project/" + project.project_id}>{project.title}</a></label><br/>
                    <p>{project.description}</p>
                </td>
                <td><a href={"/users/" + project.username}>{project.username}</a></td>
                <td>{project.skills}</td>
                <td>NULL</td>
                <td>{project.budget}</td>
            </tr>);


            projectEle1 = <div class="container"><div class="col-sm-1"></div><div class="col-sm-10">
                <label>Relevant Projects based on Your Profile: </label><br/><br/>
                <table class="table">
                    <thead>
                    <tr>
                        <th style={thStyle}>Project</th>
                        <th style={thStyle}>Employer</th>
                        <th style={thStyle}>Skills Required</th>
                        <th style={thStyle}>Number of Bid yet</th>
                        <th style={thStyle}>Budget Range</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableBody1}
                    </tbody>
                </table>
            </div>
                <div class="col-sm-1"></div></div>
		}

		return (<div>
		<div id="myModal" class="modal fade" role="input">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Your Bid</h4>
		      </div>
		      <div class="modal-body">
		      	<form onSubmit={this.handleSubmit}>
				  <div class="form-group">
				  	<label>Bid amount</label>
				  	<input class="form-control" />
				  </div>
				  <div class="form-group">
				  	<label>Number of days</label>
				  	<input class="form-control" />
				  </div>
				  <div class="form-group">
				  	<button type="submit" class="btn btn-primary form-control" id="btn">Bid Now</button>
				  </div>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
			<nav class="navbar navbar-default">
			  <div class="container">
			    <div class="navbar-header">
			      <a  href="/"><img class="navbar-brand"style={imgStyle} src="https://cdn6.f-cdn.com\/build\/icons\/fl-logo.svg"/></a>
			    </div>
			    <button class="btn btn-primary navbar-btn navbar-right" name="logout" onClick={this.logout.bind(this)}>Log out</button>
			    <ul class="nav navbar-nav navbar-right">
			      <li class="dropdown">
			        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
			        <span class="glyphicon glyphicon-user"></span></a>
			        <ul class="dropdown-menu">
			          <li><a href="/update-profile">Update My Profile</a></li>
			          <li><a href={"/users/" + authentication.username}>View My Profile</a></li>
                        <li><a href="/update-profile">Projects Assigned To Me</a></li>
                        <li><a href="/projects-hired">Projects Hired By Me</a></li>
			        </ul>
			      </li>
			    </ul>
			    <button class="btn btn-warning navbar-btn navbar-right" name="post-project" onClick={this.handleClick}>post-project</button>
			    <button class="btn btn-primary navbar-btn" name="dashboard" onClick={this.handleClick}>Dashboard</button>
                  &nbsp;
                  &nbsp;
                  <button class="btn btn-primary navbar-btn" name="homepage" onClick={this.handleClick}>Home</button>
                  &nbsp;
                  &nbsp;
                  <input class="form-control " type="text" style={sStyle} value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search For Projects By Skill" autoFocus/>
			  </div>
			</nav>
			<div>
				{projectEle}
				</div>
                <div>
                    {projectEle1}
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
    	getProjectsList : () => dispatch(userActions.getProjectsList()),
        logout : () => dispatch(userActions.logout())
    };
}
const ConnectedHomePage = connect(mapStateToProps,mapDispatchToProps)(HomePage);
export default ConnectedHomePage;