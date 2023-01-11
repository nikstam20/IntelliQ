const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');
const { parse } = require('../node_modules/json2csv');


// TODO: query, all else works
router.post('/:questionnaireID', function(req, res) {
	const { questionnaireID } = req.params;
	// console.log("in resetq")
	pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed"});
				console.log("Connection failed", err);
		}
        // WARNING:::: wrong query! just for testing 
		q = `truncate table User`; 
		connection.query(q, function(err, result) {
        	if(err) {
				res.status(500).json({status:"failed", reason: "Couldn't delete answers"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Answers for questionnaire deleted.");
			}
		});
		connection.release();
	});
});

module.exports = router;