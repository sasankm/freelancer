import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';

const thStyle ={
    backgroundColor: '#428bca',
    color: 'white'
}
class Dashboard extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			projects:[]
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		//const { dispatch } = this.props;
		//dispatch(userActions.getBidsUser());
		//dispatch(userActions.getProjectsPublished());
		this.props.getBidsUser(this.props.bids);
		this.props.getProjectsPublished(this.props.projects);
	}

	handleClick(e){
		const { name } = e.target;
        const { dispatch } = this.props;
		console.log(name);
		if(name == "post-project"){
			history.push('/post-project')
		}
		else if(name == "dashboard"){
			history.push('/dashboard');
		}
	}
	logout(event){
		event.preventDefault();
		this.props.logout();
	}

	render(){
		const { authentication, user } = this.props;
		console.log("authentication", authentication);
		console.log("bids", user.bids)
		console.log("projects", user.projects);

		let projectEle = null;
		if(user.bids && user.projects){

			let bidBody = user.bids.map( bid => <tr>
												<td><a href={"/project/"+bid.projectId}>{bid.title}</a></td>
												<td><a href={"/users/"+bid.username}>{bid.username}</a></td>
												<td>{bid.avg}</td>
												<td>{bid.bid}</td>
												<td>"OPEN"</td>
											</tr>);

			let publishedBody = user.projects.project.map( project => <tr>
												<td><a href={"/project/"+project.project_id}>{project.project}</a></td>
												<td>{project.bid}</td>
												<td><a href={"/users/"+project.freelancer}>{project.freelancer}</a></td>
												<td>{project.period}</td>
												<td>"OPEN"</td>
											</tr>);

			projectEle = <div>
							<div class="container"><div class="col-sm-1"></div><div class="col-sm-10">
							<label>Projects You have a bid on : </label><br/><br/>
							<table class="table">
							    <thead>
							      <tr>
							        <th style={thStyle}>Project</th>
							        <th style={thStyle}>Employer</th>
							        <th style={thStyle}>Avg. Bid</th>
							        <th style={thStyle}>Your Bid</th>
							        <th style={thStyle}>status</th>
							      </tr>
							    </thead>
							    <tbody>
								{bidBody}
							    </tbody>
							  </table><br/><br/>
							  <label>Projects You Published : </label><br/><br/>
							<table class="table">
							    <thead>
							      <tr>
							        <th style={thStyle}>Project</th>
							        <th style={thStyle}>Bid</th>
							        <th style={thStyle}>Freelancer</th>
							        <th style={thStyle}>Period in days</th>
							        <th style={thStyle}>status</th>
							      </tr>
							    </thead>
							    <tbody>
							    {publishedBody}
							    </tbody>
							  </table>
						</div>
						<div class="col-sm-1"></div></div></div>
		}

		return (<div>
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
			    <button class="btn btn-primary navbar-btn navbar-right" name="post-project" onClick={this.handleClick}>post-project</button>
			    <button class="btn btn-primary navbar-btn" name="dashboard" onClick={this.handleClick}>dashboard</button>
			  </div>
			</nav>
			<div>{projectEle}</div></div>
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
		getBidsUser : () => dispatch(userActions.getBidsUser()),
		getProjectsPublished : () => dispatch(userActions.getProjectsPublished()),
        logout : () => dispatch(userActions.logout())
	}
}

const ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default ConnectedDashboardPage;