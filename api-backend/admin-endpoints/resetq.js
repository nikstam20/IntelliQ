const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');

router.post('/:questionnaireID', function(req, res) {
	const { questionnaireID } = req.params;
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("Connection failed", err);
			res.status(500).json({status:"failed"});
				
		}
		q = `delete from Answer where Answer.Option_questionnaire_id = ${questionnaireID};`; 
		connection.query(q, function(err, result) {
        	if(err) {
				console.log(err);
				return res.status(400).json({status:"failed", reason: "Couldn't delete answers"});
                
			}
			else {
				console.log("Answers for questionnaire deleted.");
				res.status(200).json({status:"OK"});
			}
		});
		connection.release();
	});
});

module.exports = router;
