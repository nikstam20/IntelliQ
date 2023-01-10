// TODO: require paths should be updated, waiting on the files & locations


const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');

router.post('/:questionnaireID', function(req, res) {
    const { questionnaireID } = req.params;
	pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed"});
				console.log("connection failed", err);
		}
        // TODO: test the query/make it right??? -nat
		connection.query(`DELETE * FROM Session WHERE Questionnaire_questionnaire_id = ${questionnaireID} `, function(err) 
		{
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