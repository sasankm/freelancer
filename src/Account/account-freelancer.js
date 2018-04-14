import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';

class AccountFreelancer extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick(e) {
        const {name} = e.target;
        console.log(name);
        if (name == "post-project") {
            history.push('/post-project')
        }
        else if (name == 'dashboard') {
            history.push('/dashboard')
        }
        else if (name == 'homepage') {
            history.push('/homepage')
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        console.log(name, value);
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    logout(event) {
        event.preventDefault();
        this.props.logout();
    }
    render(){
        const {authentication, user} = this.props;
        return(
            <div>
                <nav class="navbar navbar-default">
                    <div class="container">
                        <div class="navbar-header">
                            <a href="/"><img class="navbar-brand"
                                             src="https://cdn6.f-cdn.com\/build\/icons\/fl-logo.svg"/></a>
                        </div>
                        <button class="btn btn-primary navbar-btn navbar-right" name="logout"
                                onClick={this.logout.bind(this)}>Log out
                        </button>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <span class="glyphicon glyphicon-user"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="/update-profile">Update My Profile</a></li>
                                    <li><a href={"/users/" + authentication.username}>View My Profile</a></li>
                                    <li><a href="/projects-assigned">Projects Assigned To Me</a></li>
                                    <li><a href="/projects-hired">Projects Hired By Me</a></li>
                                </ul>
                            </li>
                        </ul>
                        <button class="btn btn-warning navbar-btn navbar-right" name="post-project"
                                onClick={this.handleClick}>post-project
                        </button>
                        <button class="btn btn-primary navbar-btn" name="dashboard"
                                onClick={this.handleClick}>Dashboard
                        </button>
                        &nbsp;
                        &nbsp;
                        <button class="btn btn-primary navbar-btn" name="homepage" onClick={this.handleClick}>Home
                        </button>
                    </div>
                </nav>
                <div>
                <div class="container">
                    <div class="col-sm-6">
                        <label><h3>Freelancer Account Balance :</h3></label>
                       <div class="well well-lg">
                           <label>My Total Balance :</label>
                           <input type="text" class="form-control" /><br />
                           <label>Click To See Transaction Hitsory :</label><br/>
                           <button type="submit" class=" btn btn-primary">Transaction History</button><br/>
                       </div><br/>
                        <div class="well well-lg">
                           <label>Withdrawable balance :</label>
                           <input type="text" class="form-control" />
                           &nbsp;
                           <button type="submit" class="center-block btn btn-primary">Withdraw</button>
                        </div>
                    </div>
                </div>
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
        //getProjectsHired : (project_id) => dispatch(userActions.getProjectsHired(project_id)),
        logout : () => dispatch(userActions.logout())

    };
}
const ConnectedAccountFreelancerPage = connect(mapStateToProps, mapDispatchToProps)(AccountFreelancer);
export default ConnectedAccountFreelancerPage;