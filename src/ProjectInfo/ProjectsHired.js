import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers/history';

class ProjectsHired extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        let path = this.props.location.pathname.split('/');
        if (path[1] == 'project' && path.length == 3) {
            this.props.getProjectsHired(path[2]);
        }
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

    render() {
        const {authentication, user} = this.props;
        let hiredEle = null;

            hiredEle = <div class="container">
                <div class="col-sm-6">
                    <label><h3>Projects Hired By Me :</h3></label>
                    <h2></h2>
                    <div class="well well-lg">
                        <h4><u>Project Description:</u></h4>
                        <p></p>
                        <h4><u>Skills Required:</u></h4>
                        <p></p>
                        <h4><u>Budget Range:</u></h4>
                        <p></p>
                        <h4><u>Average bid:</u></h4>
                        <p></p>
                    </div>
                </div>
                <br/>
                <h3>Submission Panel</h3>
                <div class="well well-lg col-sm-4">
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label for="bid">File Upload :</label>
                            <input type='file' OnChange={this.handleChange} name="file" id="file"/>
                        </div>
                        <div class="form-group">
                            <label for="period">Comments :</label>
                            <textarea onChange={this.handleChange} class="form-control" name="comments" id="comments"/>
                        </div>
                        <button type="submit" class="center-block btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        return (
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
                                    <li><a href="/update-profile">Projects Assigned To Me</a></li>
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
                    {hiredEle}
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
        getProjectsHired : (project_id) => dispatch(userActions.getProjectsHired(project_id)),
        logout : () => dispatch(userActions.logout())

    };
}
const ConnectedProjectsHiredPage = connect(mapStateToProps, mapDispatchToProps)(ProjectsHired);
export default ConnectedProjectsHiredPage;