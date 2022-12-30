// TODO: require paths should be updated, waiting on the files & locations


const express = require('../express');
const router = express.Router();
const pool = require('../connect');

router.post('/:questionnaireID', function(req, res) {
    const { questionnaireID } = req.params;
	pool.connect(function(err, client, release) {
		if(err) {
			res.status(500).json({status:"failed"});
				console.log("connection failed", err);
		}
        // TODO: test the query/make it right??? -nat
		client.query("DELETE * FROM Session WHERE Questionnaire_questionnaire_id = [questionnaireID]", function(err) 
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
		release();
	});
});

module.exports = router;