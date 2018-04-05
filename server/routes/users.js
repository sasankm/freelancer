var express = require('express');
var router = express.Router();
var getConnection = require('../database/mysql.js');
var mysql = require('mysql');
var cryptPassword = require('../crypto.js').cryptPassword;
var comparePassword = require('../crypto.js').comparePassword;

function auth(req, res, next){
  if(!req.loggedIn)
    return res.send({"error": "UNAUTHORISED"});

  next();
}

router.post('/signup', function(req, res, next) {
	//signup
	let body = req.body;

	if(!body || !body.username || !body.email || !body.password){
		return res.send(JSON.stringify({error: "INSUFFICIENT_INFO"}));
	}

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		cryptPassword(body.password, function(err, hash){
			let query = "INSERT INTO Users (username, email, password) VALUES (" + mysql.escape(body.username) + "," 
							+ mysql.escape(body.email) + "," + mysql.escape(hash) + ");";
			conn.query(query, function(derr, dres) {
				conn.release();
				if(derr){
					if(derr.code = 'ER_DUP_ENTRY')
						return res.send(JSON.stringify({error: "DUP_USERNAME"}));
					return res.send(JSON.stringify({error: "UNAUTHORISED"}));
				}
				return res.send(JSON.stringify({status: "SUCCESS"}));
			})
		});
	});
});


router.post('/login', function(req, res, next){
	//login
	let body = req.body;
	console.log(body, body.username, body.password);
	if(!body || !body.username || !body.password){
		return res.send(JSON.stringify({error: "INSUFFICIENT_INFO"}));
	}

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "select password,email from Users where username = " + mysql.escape(body.username) +";";

		conn.query(query, function(derr, dres) {
			conn.release();
			if(derr){
				//return valid res
				return res.send({status: "UNAUTHORISED"});
			}
			if(dres.length != 0){
				comparePassword(body.password, dres[0].password, function(err, isMatch){
					if(isMatch){
						req.session.username = body.username;
						req.session.email = dres[0].email;
						return res.send(JSON.stringify({status: "SUCCESS"}));
					}
					return res.send(JSON.stringify({status: "UNAUTHORISED"}));
				});
			} else {
				return res.send(JSON.stringify({status: "UNAUTHORISED"}));
			}
		});
	});
});


router.get('/logout', auth, function(req, res, next){
	//logout
	req.session.destroy();
	return res.send(JSON.stringify({status: "SUCCESS"}));
});

router.get('/user', function(req, res, next){
	//get user info
	console.log("request in user: ", req.query);
	if(!req.query || !req.query.username)
		return res.send(JSON.stringify({status: "NOT_ENOUGH_INFO"}));

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "SELECT * FROM Users WHERE " + "username = " + mysql.escape(req.query.username) + ";";
		console.log(query);
		conn.query(query, function(derr, dres) {
			conn.release();
			console.log("check this: ", dres);
			if(derr){
				//return valid res
				return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
			}
			let data = dres[0];
			delete data.password;
			delete data.image;
			return res.send(JSON.stringify({status: "SUCCESS", data}))
		});
	});
});

router.post('/update-profile', auth, function(req, res, next){
	//post user info
	console.log("Received req: ", req.body);
	let body = req.body;

	let dobj = [];
	if(body.name) dobj.push("name = " + mysql.escape(body.name));
	if(body.email) dobj.push("email = " + mysql.escape(body.email));
	if(body.phone) dobj.push("phone = " + mysql.escape(body.phone));
	if(body.aboutme) dobj.push("aboutme = " + mysql.escape(body.aboutme));
	if(body.skills) dobj.push("skills = " + mysql.escape(body.skills));
	console.log(JSON.stringify(dobj));
	let updateStr = "";
	for(var i=0; i<dobj.length-1; i++){
		updateStr = updateStr + dobj[i] + ",";
	}
	updateStr += dobj[dobj.length-1];

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "UPDATE Users SET " + updateStr + " WHERE username = " + mysql.escape(req.user) + ";";
		console.log(query);
		conn.query(query, function(derr, dres) {
			conn.release();
			if(derr){
				//return valid res
				return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
			}
			return res.send(JSON.stringify({status: "SUCCESS"}))
		});
	});
});


module.exports = router;
