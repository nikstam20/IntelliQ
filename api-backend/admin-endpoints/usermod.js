const express = require('../node_modules/express')
const router = express.Router();
const pool = require('../connect');
const { parse } = require('../node_modules/json2csv');


// TODO: add support for CHANGING password, not just adding users
router.post('/:username/:password', function(req, res) {
	const { username, password } = req.params;
	pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed"});
			console.log("Failed to connect to database.", err);
		}
		connection.query(`insert into User(username, password) values ('${username}', '${password}')`, function(err, result) 
		{
			if(err) {
				res.status(400).json({status:"failed"});
				console.log("Usermod bad request", err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Usermod success.");
			}
   		});
		connection.release();
	});
});

module.exports = router;