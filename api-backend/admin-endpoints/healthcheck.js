// TODO: require paths should be updated, waiting on the files & locations

const express = require('../express');
const router = express.Router();
const pool = require('../connect');

router.get('/', function(req, res) {
	pool.connect(function(err, client, release) {
		if(err) {
		        res.status(500).json({status:"failed", "dbconnection":"mysql://root:password@localhost:port/intelliq"});
                        console.log("Connection could not be established.", err);
  		}
		else {
			res.status(200).json({status:"OK", "dbconnection":"mysql://root:password@localhost:port/intelliq"});
                       	console.log("Successful connection to MySQL database.");
		}
		release();
	});
});

module.exports = router;