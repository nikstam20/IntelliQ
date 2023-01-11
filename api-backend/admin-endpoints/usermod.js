const express = require('../node_modules/express')
const router = express.Router();
const pool = require('../connect');


router.post('/:username/:password', function(req, res) {
	const { username, password } = req.params;
	pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed"});
			console.log("Failed to connect to database.", err);
		}
		else {
		q = `select username from User where username = '${username}'`;

		connection.query(q, function(err, result) {

			if(err) {
				res.status(500).json({status:"failed", reason: "Error getting user information."});
				console.log(err);
			}
			else {
					if(result.length == 0) {
						// Empty set response -> add user functionality
						connection.query(`insert into User(username, password) values ('${username}', '${password}')`, function(err, result) 
						{
							if(err) {
								res.status(400).json({status:"failed"});
								console.log("Usermod bad request", err);
							}
							else {
								res.status(200).json({status:"OK"});
								console.log("User successfully added.");
							}
						});
					}
					
					else {
						// User exists in the database -> change password functionality
						connection.query(`update User set password = '${password}' where username = '${username}'`, function(err, result) 
						{
							if(err) {
								res.status(400).json({status:"failed"});
								console.log("Update failed.", err);
							}
							else {
								res.status(200).json({status:"OK"});
								console.log("Password successfully changed.");
							}
						});
					}
				}	
			});
		}
		connection.release();
	});
});

module.exports = router;