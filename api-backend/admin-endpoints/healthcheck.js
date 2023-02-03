const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');

router.get('/', function(req, res) {
	pool.getConnection(function(err, connection) {
		if(err) {
		        res.status(500).json({status:"failed", "dbconnection":"mysql://root:password@localhost:port/intelliq"});
                        console.log("Connection could not be established.", err);
  		}
		else {
			res.status(200).json({status:"OK", "dbconnection":"mysql://root:password@localhost:port/intelliq"});
                       	console.log("Successful connection to MySQL database.");
		}
		connection.release();
	});
});

module.exports = router;