const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');
var id= 1;


router.post('/:questionnaireID/:questionID/:session/:optionID', function(req, res) {
const { questionnaireID, questionID, session, optionID } = req.params;
pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed"});
			console.log("Failed to connect to database.", err);
		}
        //paizei na exei themataki to post gt den tou dinoume timi sto answer_id
		connection.query(`insert into Answer(answer_id,Option_option_id,Option_questionnaire_id,Option_question_id, Session_session_id) values ('${id}''${optionID}', '${questionnaireID}','${questionID}','${session}','${optionID}')`, function(err, result) 
		{
			if(err) {
				res.status(400).json({status:"failed"});
				console.log("Usermod bad request", err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("answer success.");
			}
   		});
		connection.release();
	});
});


module.exports = router;
