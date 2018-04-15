var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'mydbinstance.ce4iu9boor4m.us-west-1.rds.amazonaws.com:3306',
    user     : 'sasank196',
    password : 'sasank196',
    database : 'freelancer1'
});

var getConnection = function(callback){
	pool.getConnection(callback);
}

module.exports = getConnection;
