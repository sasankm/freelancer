import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';

class PostProject extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			title: "",
			desc: "",
			file: "",
			skills: "",
			budget: "10-30"
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		const { dispatch } = this.props;
		this.props.postProject(this.state);
		//dispatch(userActions.postProject(this.state));
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
		else if(name == 'homepage'){
			history.push('/homepage')
		}
	}
	logout(event){
		event.preventDefault();
        //this.setState({ submitted: true });
        //const { username, password } = this.state;
        //const { dispatch } = this.props;
        this.props.logout();
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
			    <button class="btn btn-primary navbar-btn navbar-right" name="logout" onClick={this.logout.bind(this)}>Log out</button>
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
			    <button class="btn btn-warning navbar-btn navbar-right" name="post-project" onClick={this.handleClick}>post-project</button>
			    <button class="btn btn-primary navbar-btn" name="dashboard" onClick={this.handleClick}>dashboard</button>
				  &nbsp;
				  &nbsp;
                  <button class="btn btn-primary navbar-btn" name="homepage" onClick={this.handleClick}>Home</button>
			  </div>
			</nav>
			<div class="container">
			<div class="row"><div class="col-sm-2"></div><div class="col-sm-8">
			<form onSubmit={this.handleSubmit}>
			  <div class="form-group">
			    <label for="project-title">Choose a name for your project:</label>
			    <input class="form-control" id="project-title" placeholder="e.g. Build me a website" name="title" onChange={this.handleChange} autoFocus/>
			  </div><br/>
			  <div class="form-group">
			    <label for="desc">Tell us more about your project:</label>
			    <p>Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</p>
			    <textarea name="desc" onChange={this.handleChange} rows="5" class="form-control" id="desc" placeholder="Describe your project here..."/><br/>
			    <label>File Upload</label><br/>
			    <p>Upload files that be helpful in explaining your project </p>
			    <input name="file" type="file" onChange={this.handleChange} hidden/>
			  </div><br/>
			  <div class="form-group">
			    <label for="skills">What skills are required?</label>
			    <p>Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in.</p>
			    <textarea name="skills" onChange={this.handleChange} class="form-control" id="skills" placeholder="What skills are required?"/><br/>
			  </div><br/>
			  <div class="form-group">
			    <label for="budget">What is your estimated budget?</label>
			    <p></p>
			    <select class="form-control" name="budget" onChange={this.handleChange}>
				    <option value="10-30">Micro Project ($10 - 30 USD)</option>
				    <option value="30-250">Simple project ($30 - 250 USD)</option>
				    <option value="250-750">Very small project ($250 - 750 USD)</option>
				    <option value="750-1500">Small project ($750 - 1500 USD)</option>
				    <option value="1500-3000">Medium project ($1500 - 3000 USD)</option>
				    <option value="3000-5000">Large project ($3000 - 5000 USD)</option>
				    <option value="5000-10000">Larger project ($5000 - 10000 USD)</option>
				    <option value="10000-20000">Very Large project ($10000 - 20000 USD)</option>
				    <option value="20000-50000">Huge project ($20000 - 50000 USD)</option>
				    <option value="$50000 +  USD">Major project ($50000 +  USD)</option>
				 </select>
			  </div><br/>
			  <button type="submit" class="center-block btn btn-primary">Post My Project</button>
			</form>
			</div><div class="col-sm-2"></div></div></div>
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
		postProject : (project) => dispatch(userActions.postProject(project)),
		logout : () => dispatch(userActions.logout())
	};
}

const ConnectedPostProjectPage = connect(mapStateToProps,mapDispatchToProps)(PostProject);
export default ConnectedPostProjectPage;
