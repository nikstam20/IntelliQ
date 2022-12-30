const pg = require('pg');
require('dotenv').config();

const config = {
  	user: "root",
	host: "localhost",
  	database: "mydb",
  	password: "",
  	port: 3306,
	idleTimeoutMillis: 30000,
  	connectionTimeoutMillis: 2000,
}

const pool = new pg.Pool(config);
module.exports = pool;