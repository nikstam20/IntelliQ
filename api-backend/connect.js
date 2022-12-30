const mysql_db = require('mysql');
require('dotenv').config();

const connect = mysql_db.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: 'mydb',
	port: '3306'
});

connect.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports = connect;