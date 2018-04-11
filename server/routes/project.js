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

router.post('/post-project', auth, function(req, res, next){
	console.log("Received req: ", req.body);
	let body = req.body;

	if(!body || !body.title || !body.desc || !body.file || !body.skills || !body.budget){
		return res.send(JSON.stringify({error: "INSUFFICIENT_INFO"}));
	}

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "INSERT INTO Project (username, title, description, filepath, skills, budget, status) VALUES (" 
						+ mysql.escape(req.user) + ","
						+ mysql.escape(body.title) + ","
						+ mysql.escape(body.desc) + ","
						+ mysql.escape("") + ","
						+ mysql.escape(body.skills) + ","
						+ mysql.escape(body.budget) + ","
						+ mysql.escape("OPEN") + ");";

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

router.get('/projects', function(req, res, next){
	console.log("Received req to get list of projects");

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "SELECT * FROM Project;";

		conn.query(query, function(err, resp){
			conn.release();
			if(err){
				console.log(err)
				return res.send(JSON.stringify({error: "DATABASE"}));
			}
			return res.send(JSON.stringify({status: "SUCCESS", projects: resp}));
		});
	});
});

router.get('/project', function(req, res, next){
	console.log("Received req for single project");

	if(!req.query || !req.query.name){
		return res.send(JSON.stringify({status: "NOT_ENOUGH_INFO"}));
	}

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "SELECT * FROM Project WHERE project_id = " + req.query.name;

		conn.query(query, function(err, resp){
			conn.release();
			if(err){
				console.log(err)
				return res.send(JSON.stringify({error: "DATABASE"}));
			}
			return res.send(JSON.stringify({status: "SUCCESS", project: resp[0]}));
		});
	});
});

//should return [name, bid, freelancer, period, status]
router.get('/projectspublished', auth, function(req, res, next){
	console.log("req to print the list of published projects");

	getConnection(function(err, conn){
		if(err){
			return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
		}
		let query = "SELECT * FROM Project WHERE username = " + mysql.escape(req.user);

		conn.query(query, function(err, resp){
			if(err){
				console.log(err)
				return res.send(JSON.stringify({error: "DATABASE"}));
			}
			var projects = [];

			function bids(i, obj, conn, cb) {
				if( i == obj.length ) return cb();

				let query = "SELECT * FROM Bids where projectId = " + obj[i].project_id;
				conn.query(query, function(err, res){
					for(let j=0; j<res.length; j++){
						projects.push({
							project: obj[i].title,
							bid: res[j].bid,
							freelancer: res[j].userName,
							period: res[j].period,
							status: res[j].status,
							project_id: obj[i].project_id
						});
					}
					bids(i+1, obj, conn, cb);
				});
			}

			bids(0, resp, conn, function(){
				conn.release();
				return res.send(JSON.stringify({status: "SUCCESS", project: projects}));
			})
		});
	});

});
router.get('/projectshired' , auth , function(req, res, next) {
    console.log('req to print projects hired');

    getConnection(function (err, conn) {
        if (err) {
            return res.send(JSON.stringify({error: "DATABASE_ERROR"}));
        }
        let query = "SELECT * FROM Project WHERE project_id = " + mysql.escape(req.project_id);
        conn.query(query, function(err, resp){
            conn.release();
            if(err){
                console.log(err)
                return res.send(JSON.stringify({error: "DATABASE"}));
            }
            return res.send(JSON.stringify({status: "SUCCESS", project: resp[0]}));
        });
    });
});

module.exports = router;