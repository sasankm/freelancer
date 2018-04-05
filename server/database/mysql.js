var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'sravya',
    database : 'freelancer1'
});

var getConnection = function(callback){
	pool.getConnection(callback);
}

module.exports = getConnection;
