import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { userActions } from './_actions';
import { Link, Redirect } from 'react-router-dom';


const divStyle= {
    margintop : "10%"
};
const imgStyle = {
    width: '150px',
    height : '50px'
};
const fontStyleHeader={
    fontWeight : 'bold',
    fontSize : '21px'
};
const fontStyleInput ={
    fontSize : '17px'
};

class Signup extends React.Component {

    constructor() {
        super();

        this.state = {
            'username': "",
            'password': "",
            'email': ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(userActions.isUserLoggedIn());
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const {username, password, email} = this.state;
        const {dispatch} = this.props;
        if (username && password && email) {
            dispatch(userActions.signup(username, password, email));
        }
        console.log(username, password, email);
    }

    render() {
        const { signingup  } = this.props;
        return (
            <div className="Signup" class="container-fluid">
                <div class="row">
                    <div class="col-sm-offset-3 col-md-offset-3 col-lg-offset-3 col-sm-3 col-md-3 col-lg-7"
                         style={divStyle}>
                        <div class="panel panel-default">
                            <div class="panel-heading text-center">
                                <img style={imgStyle} class="flicon-logo-fullcolor"
                                     src="https://www.f-cdn.com/assets/img/fl-logo-c555380d.svg"
                                     alt="Freelancer Logo"/>
                                <hr/>
                                <font style={fontStyleHeader}>Sign Up for free today!</font>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal" role="form"
                                      onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label class="col-sm-3 col-md-3 col-lg-3" style={fontStyleInput}>
                                            User Name :</label>
                                        <div class="col-sm-8 col-md-8 col-lg-8">
                                            <input type="text" class="form-control" name="username"
                                                   onChange={this.handleChange}
                                                   id="uname" placeholder="User Name" autoFocus/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 col-md-3 col-lg-3" style={fontStyleInput}>
                                            Email Id :</label>
                                        <div class="col-sm-8 col-md-8 col-lg-8">
                                            <input type="email" class="form-control" name="email"
                                                   onChange={this.handleChange}
                                                   id="email" placeholder="Email Id" required/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 col-md-3 col-lg-3" style={fontStyleInput}>
                                            Password :</label>
                                        <div class="col-sm-8 col-md-8 col-lg-8">
                                            <input type="password" class="form-control"
                                                   onChange={this.handleChange}
                                                   name="password" id="pwd" placeholder="Password" required/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-5">
                                            <button type="submit" class="btn btn-primary">
                                                <font style={fontStyleInput}>Create Account</font></button>
                                        </div>
                                    </div>
                                    <hr/>
                                    <p align="center">Already have an Account?
                                        <Link to="/login"> LogIn</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { signingup } = state.authentication;
    return {
        signingup
    };
}

const ConnectedSignupPage = connect(mapStateToProps)(Signup);
export default ConnectedSignupPage;
