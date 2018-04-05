import axios from 'axios';
import { history } from '../_helpers/history';

export const userActions = {
	signup,
    login,
    getUserInfo,
    logout,
    isUserLoggedIn,
    postProject,
    updateProfile,
    getProjectsList,
    getProjectInfo,
    bid,
    getBids,
    getBidsUser,
    getProjectsPublished
};

function signup(username,password, email){
	return dispatch => {
		axios('http://localhost:3000/users/signup', {
			method:"post",
			data: {username, password, email},
			withCredentials: true
		}).then(function(res){
			if( res.data && res.data.status == "SUCCESS"){
				dispatch({type: "SIGNUP_SUCCESS", username})
				history.push('/login')
			} else {
				dispatch({type: "SIGNUP_FAILURE"});
			}
		})
			.catch(function(err){
				dispatch({typr: "SIGNUP_FAILURE"})
			})
	};
}

function login(username, password) {
	return dispatch => {
        axios('http://localhost:3000/users/login', {
        	method: "post",
        	data: {username, password},
        	withCredentials: true
        }).then(function(res){
        		console.log(res.data);
        		if(res.data && res.data.status == "SUCCESS"){
	        		dispatch({type: "LOGIN_SUCCESS", username})
	        		history.push('/homepage')
        		} else {
        			dispatch({type: "LOGIN_FAILURE"});
        		}
        	})
        	.catch(function(err) {
        		dispatch({type: "LOGIN_FAILURE"})
        	})
    };
}

function logout(){
	return dispatch => {
		axios('http://localhost:3000/users/logout', {
			method: "get",
			withCredentials: true
		}).then(function(res){
			if(res.data.status === "SUCCESS"){
                dispatch({type: "LOGOUT_SUCCESS"});
                history.push("/login");
			}
		}).catch(function(err) {
			dispatch({type: "LOGOUT_FAILURE"})
		})
	}
}

function getUserInfo(username){
	return dispatch => {
		axios('http://localhost:3000/users/user?username=' + username, {
        	method: "get",
        	withCredentials: true
        }).then(function(res){
        		console.log("res", res);
        		dispatch({type: "GET_USER_SUCCESS", res});
        	}).catch(function(err) {
        		dispatch({type: "GET_USER_FAILURE"})
        	})
	}
}

function isUserLoggedIn(){
	return dispatch => {
		axios('http://localhost:3000/check', {
			method: "get",
        	withCredentials: true
		}).then(function(res){
			console.log("res: ", res.data);
			if(res.data.status == "SUCCESS")
				dispatch({type: "CHECK_SUCCESS", username: res.data.username});
			else
				dispatch({type: "CHECK_FAILURE"});
		}).catch(function(err) {
			dispatch({type: "CHECK_FAILURE"})
		})
	}
}

function postProject(project){
	console.log("posting project", project);
	return dispatch => {
		axios('http://localhost:3000/project/post-project', {
			method: "post",
			data: project,
        	withCredentials: true
		}).then(function(res){
                console.log("res postProject ", res);
                dispatch({type: "POST_PROJECT_SUCCESS", res});
                history.push('/homepage');
		}).catch(function(err){
			//what to do
			console.log("error in post-project")
		})
	}
}

function getProjectsList(){
	console.log("action to get list of projects");
	return dispatch => {
		axios('http://localhost:3000/project/projects', {
			method: "get",
			withCredentials: true
		}).then(function(res){
			console.log("res getProjectsList", res);
			dispatch({type: "GET_PROJECTS_SUCCESS", res});
		}).catch(function(err){

		})
	}
}

function getProjectInfo(project_id){
	console.log("request to get project info");
	return dispatch => {
		axios('http://localhost:3000/project/project?name='+project_id, {
			method: "get",
			withCredentials: true
		}).then(function(res){
			console.log("res getProjectInfo", res.data.project);
			dispatch({type: "GET_PROJECT_SUCCESS", res});
		}).catch(function(err){
			console.log("err getProjectInfo");
		});
	}
}

function updateProfile(profile){
	console.log("profile update req: ", profile)
	return dispatch => {
		axios('http://localhost:3000/users/update-profile', {
			method: "post",
			data: profile,
        	withCredentials: true
		}).then(function(res){
			console.log("res update-profile ", res);
			history.push('/dashboard');
			dispatch({type: "POST_PROJECT_SUCCESS", res});
		}).catch(function(err){
			//what to do
			console.log("error in post-project")
		})
	}
}

function bid(bid, period, project_id){
	console.log("Request to post a bid for project ", project_id)
	return dispatch => {
		axios('http://localhost:3000/bids/bid', {
			method: "post",
			data: {bid, period, project_id},
        	withCredentials: true
		}).then(function(res){
			console.log("res post-bid ", res);
			dispatch({type: "POST_BID_SUCCESS"});
		}).catch(function(err){
			//what to do
			console.log("error in post-bids")
		})
	}	
}

function getBids(project_id){
	console.log("request to get bids for project_id", project_id);
	return dispatch => {
		axios('http://localhost:3000/bids/bid?project_id='+project_id, {
			method: "get",
			withCredentials: true
		}).then(function(res){
			console.log("res get-bids ", res);
			dispatch({type: "GET_BID_SUCCESS", res});
		}).catch(function(err){
			//what to do
			console.log("error in get-bids")
		})
	}
}

function getBidsUser(){
	console.log("Request to getBidsUser ");
	return dispatch => {
		axios('http://localhost:3000/bids/userbids', {
			method: "get",
			withCredentials: true
		}).then(function(res){
			console.log("res get-user-bids ", res);
			dispatch({type: "GET_BIDUSER_SUCCESS", res})
		}).catch(function(err){
			console.log("error in get-user-bids")
		})
	}
}

function getProjectsPublished(){
	console.log("Request to getProjectsPublished");
	return dispatch => {
		axios('http://localhost:3000/project/projectspublished', {
			method: "get",
			withCredentials: true
		}).then(function(res){
			console.log("res get-project-published ", res);
			dispatch({type: "GET_PROJECTSPUBLISHED_SUCCESS", res})
		}).catch(function(err){
			console.log("error in get-project-published")
		})
	}
}

