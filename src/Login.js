import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { userActions } from './_actions';
import { Link, Redirect } from 'react-router-dom';

const divContainer= {
    margintop: '10%',
    marginbottom: '20%',
    marginleft: '30%',
    marginbottom: '20%'
}
const divStyle={
    margintop : "10%"
};
const imgStyle = {
    width: '150px',
    height : '50px'
};
const fontStyleInput ={
    fontSize : '17px'
};


class Login extends React.Component{

	constructor(){
		super();

		this.state = {
			'username': "",
			'password': "",
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
	    const { dispatch } = this.props;
	    dispatch(userActions.isUserLoggedIn());
	}

	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

	handleSubmit(e){
		e.preventDefault();

        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
        console.log(username,password);
	}

	render(){
		console.log(this.props.loggedIn);
		if(this.props.loggedIn == false){
			return (
                <div class="container"  >
                    <div class="row" className="center" style={divContainer}>
                        <div class="col-sm-offset-3 col-md-offset-3 col-lg-offset-3 col-sm-3 col-md-3 col-lg-7"
                             style={divStyle} >
                            <div class="panel panel-default">
                                <div class="panel-heading text-center">
                                    <img style={imgStyle} class="flicon-logo-fullcolor"
                                         src="https://www.f-cdn.com/assets/img/fl-logo-c555380d.svg"
                                         alt="Freelancer Logo"/>
                                </div>
                                <div class="panel-body" >
                                    <form class="form-horizontal" role="form"
                                          onSubmit={this.handleSubmit}>
                                        <div class="form-group">
                                            <label class="col-sm-3 col-md-3 col-lg-3" style={fontStyleInput}>
                                                User Name :</label>
                                            <div class="col-sm-8 col-md-8 col-lg-8">
                                                <input type="text" class="form-control" name="username"
                                                       onChange={this.handleChange}
                                                       id="uname" placeholder="User Name" autoFocus />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 col-md-3 col-lg-3"
                                                   style={fontStyleInput}>Password :</label>
                                            <div class="col-sm-8 col-md-8 col-lg-8">
                                                <input type="password" class="form-control"
                                                       onChange={this.handleChange}
                                                       name="password" id="pwd" placeholder="Password"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-5">
                                                <button type="submit" class="btn btn-primary" id="btn">
                                                    <font style={fontStyleInput}>
                                                        Log In
                                                    </font>
                                                </button>
                                            </div>
                                        </div>
                                        <hr/>
                                        <p align="center">Don't have an Account?
                                            <Link to="/signup"> Sign Up</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			);
		} else if(this.props.loggedIn == true){
			return <Redirect to="/homepage"></Redirect>
		} else {
			return ( null );
		}
	}
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const ConnectedLoginPage = connect(mapStateToProps)(Login);
export default ConnectedLoginPage;
