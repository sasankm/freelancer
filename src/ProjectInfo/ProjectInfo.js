import React from 'react';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';


const thStyle ={
    backgroundColor: '#428bca',
    color: 'white'
}
class ProjectInfo extends React.Component{

	constructor(){
		super();
		this.state = {
			bid: "",
			period: ""
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

		const { bid, period } = this.state;
		const { dispatch, user } = this.props;
		console.log("check submit: ", bid, period, user.project.project_id);
		this.props.bid(bid,period,user.project.project_id);
		//dispatch(userActions.bid(bid, period, user.project.project_id));
	}

	handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);
        this.setState({ [name]: value });
    }

	componentDidMount(){
		const { dispatch } = this.props;
		let path  = this.props.location.pathname.split('/');
		if(path[1] == 'project' && path.length == 3){
			this.props.getProjectInfo(path[2]);
			this.props.getBids(path[2]);
			//dispatch(userActions.getProjectInfo(path[2]));
			//dispatch(userActions.getBids(path[2]));
		}
	}

	handleClick(e){
		const { name } = e.target;
		console.log(name);
		if(name == "post-project"){
			history.push('/post-project')
		}
		else if(name == 'dashboard'){
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

	render(){
		const { authentication, user } = this.props;
		console.log("authentication", authentication);
		console.log("project", user.project);
		console.log("bids", user.bids)

		let bodyEle = null;
		if(user.project && user.bids){
			let tableBody = user.bids.map(bid => <tr>
									<td><a href={"/users/" + bid.userName}>{bid.userName}</a></td>
									<td>{bid.bid}</td>
									<td>{bid.period}</td>
									</tr>)

			bodyEle = <div class="container"><div class="col-sm-6">
						<h2>{user.project.title}</h2>
						<div class="well well-lg">
							<h3>Project Description</h3>
							<p>{user.project.description}</p>
							<h4>Skills Required</h4>
							<p>{user.project.skills}</p>
							<h4>Budget Range</h4>
							<p>{user.project.budget}</p>
							<h4>Average bid</h4>
							<p>NULL</p>
						</div></div><br/>
						<h3>Bid Now</h3>
						<div class="well well-lg col-sm-4">
							<form onSubmit={this.handleSubmit}>
								<div class="form-group">
								    <label for="bid">Bid Amount :</label>
								    <input onChange={this.handleChange} class="form-control" name="bid" id="bid"/>
								  </div>
								  <div class="form-group">
								    <label for="period">Number of days :</label>
								    <input onChange={this.handleChange} class="form-control" name="period" id="period"/>
								  </div>
							  	<button type="submit" class="center-block btn btn-primary">Bid</button>
							</form>
						</div>
					<div class="col-sm-1"></div>
					<div class="container"><div class="col-sm-4"></div><div class="col-sm-8">
							<table class="table">
							    <thead>
							      <tr>
							        <th style={thStyle}>Freelancer</th>
							        <th style={thStyle}>Bid</th>
							        <th style={thStyle}>Period</th>
							      </tr>
							    </thead>
							    <tbody>
								{tableBody}
							    </tbody>
							  </table>
						</div>
						<div class="col-sm-2"></div></div>
					</div>
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
			    <button class="btn btn-primary navbar-btn" name="dashboard" onClick={this.handleClick}>Dashboard</button>
                  &nbsp;
                  &nbsp;
                  <button class="btn btn-primary navbar-btn" name="homepage" onClick={this.handleClick}>Home</button>
			  </div>
			</nav>
			<div>{bodyEle}</div>
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
		bid : (bid,period,project_id) => dispatch(userActions.bid(bid,period,project_id)),
		getProjectInfo : (project_id) => dispatch(userActions.getProjectInfo(project_id)),
		getBids : (project_id) => dispatch(userActions.getBids(project_id)),
		logout : () => dispatch(userActions.logout())
	};
}

const ConnectedProjectInfoPage = connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
export default ConnectedProjectInfoPage;
