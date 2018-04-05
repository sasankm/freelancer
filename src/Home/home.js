import React, {Component} from 'react';
//import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

const imgStyle = {
    width: '150px',
    height : '50px'
};
const divJ ={
    backgroundColor: '#428bca',
    width : '100'
}
const p ={
    color: 'white'
}

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <nav class="navbar navbar-default">
                    <div class="container ">
                        <div class="navbar-header">
                            <img style={imgStyle} class="flicon-logo-fullcolor"
                                 src="https://www.f-cdn.com/assets/img/fl-logo-c555380d.svg"
                                 alt="Freelancer Logo"/>
                        </div>
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="/">Home</a></li>
                            <li><Link to = "/about">About</Link></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li><Link to="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                            <li><Link to = "/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                            <li><Link to = '/post-project'><button class="btn btn-warning navbar-btn">Post Project</button></Link></li>
                        </ul>
                    </div>
                </nav>
                &nbsp;
                &nbsp;&nbsp;&nbsp;
                <div class="container">
                    <div class="jumbotron" style={divJ}>
                        <h2 style={p}><strong>Hire expert freelances for any job, online</strong></h2>
                        <p style={p}>Millions of small businesses use Freelancer to turn their ideas into reality.</p>
                        <p>
                            <a class="btn btn-lg btn-warning" href="/signup" role="button">I want to hire</a>
                            &nbsp;&nbsp;<a class="btn btn-lg btn-primary" href="/signup">I want to work</a>
                        </p>
                    </div>
                </div>
                <div class='container'>
                    <div class="jumbotron">
                        <h2><strong>Need work done?</strong></h2>
                        <p>It's easy. Simply post a job you need completed and receive competitive bids from freelancers within minutes.

                            <br />Whatever your needs, there will be a freelancer to get it done: from web design, mobile app development, virtual assistants, product manufacturing, and graphic design (and a whole lot more).

                            <br/>With secure payments and thousands of reviewed professional to choose from, Freelancer.com is the simplest and safest way to get work done online.</p>
                    </div>
                </div>
                <div class='container'>
                    <div class="jumbotron">
                        <h2><strong>what's great about it?</strong></h2>
                        <ul>
                            <li><p>You only have to pay for work when it has been completed and you’re 100% satisfied.</p></li>
                            <li><p>You’ll receive free bids from our talented freelancers within seconds.</p></li>
                            <li><p>We’re always here to help. Our support consists of real people who are available 24/7.</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const ConnectedHome = connect(null)(Home);
export default ConnectedHome;