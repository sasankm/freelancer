var express = require('express');
var router = express.Router();
var getConnection = require('../database/mysql.js');
var mysql = require('mysql');

function auth(req, res, next){
  if(!req.loggedIn)
    return res.send({"error": "UNAUTHORISED"});

  next();
}

router.post('/bid', auth, function(req, res, next) {
  	
  	console.log("Received req to post a bid");
  	let body = req.body;

  	if(!body || !body.project_id || !body.period || !body.bid)
  		return res.send(JSON.stringify("NOT_ENOUGH_INFO"));

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "INSERT INTO Bids(userName, projectId, period, bid, status) VALUES (" 
										+ mysql.escape(req.user) + ","
										+ mysql.escape(body.project_id) + ","
										+ mysql.escape(body.period) + ","
										+ mysql.escape(body.bid) + ","
										+ "NULL);";
		console.log(query)

		conn.query(query, function(err, resp){
			conn.release();
			if(err){
				console.log(err)
				return res.send(JSON.stringify({error: "DATABASE"}));
			}
			return res.send(JSON.stringify({status: "SUCCESS"}));
		});
	});
});

router.get('/bid', auth, function(req, res, next){
	console.log("Received req to get bids for projects: ");
	let basedOn = req.query.username ? "userName" : "projectId" ;
	let value = req.query.username ? req.query.username : req.query.project_id;

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}

		let query = "SELECT * from Bids WHERE " + basedOn + " = " + mysql.escape(value);

		console.log(query)

		conn.query(query, function(err, resp){
			conn.release();
			if(err){
				console.log(err)
				return res.send(JSON.stringify({error: "DATABASE"}));
			}
			return res.send(JSON.stringify({status: "SUCCESS", resp}));
		});
	});
});

//should return [project, employer, avg bid, your bid, status]
router.get('/userbids', auth, function(req, res, next){
	console.log("Received req to get user bids");

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}

		let query = "SELECT * from Bids WHERE userName = " + mysql.escape(req.user);

		console.log(query)

		conn.query(query, function(err, resp){
			
			if(err){
				console.log(err)
				return res.send(JSON.stringify({error: "DATABASE"}));
			}
			
			function avgBids(i, obj, conn, cb){
				if(i == obj.length) return cb();

				//find the sol;
				let query = "SELECT bid from Bids where projectId = " + obj[i].projectId;
				conn.query(query, function(err, res){
					console.log("bids list: ", i, res);
					obj[i].avg = 0;
					for(let j = 0; j < res.length; j++)
						obj[i].avg = obj[i].avg +res[j].bid;
					obj[i].avg /= res.length;

					let query = "SELECT title, username from Project where project_id = " + obj[i].projectId;
					conn.query(query, function(err, res) {
						for(let j = 0; j < res.length; j++){
							obj[i].title = res[j].title;
							obj[i].username  =res[j].username;
						}
						avgBids(i+1, obj, conn, cb);
					})
				})
 			}

			avgBids(0, resp, conn, function(){
				conn.release();
				return res.send(JSON.stringify({resp}));
			});
		});
	});
});

module.exports = router;
