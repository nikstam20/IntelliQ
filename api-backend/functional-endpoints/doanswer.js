const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');
var id = 1;


router.post('/:questionnaireID/:questionID/:session/:optionID', function (req, res) {
	const { questionnaireID, questionID, session, optionID } = req.params;
	pool.getConnection(function (err, connection) {
		if (err) {
			res.status(500).json({ status: "failed" });
			console.log("Failed to connect to database.", err);
		}

		connection.query(`insert ignore into Session(session_id, Questionnaire_questionnaire_id) values ('${session}', '${questionnaireID}')`, function (err, result) {
			if (err) {
				res.status(400).json({ status: "failed" });
				console.log("Usermod bad request", err);
			}
			else {
				console.log("created session if it didn't exist");
				connection.query(`insert into Answer(Option_option_id,Option_questionnaire_id,Option_question_id, Session_session_id) values ('${optionID}', '${questionnaireID}','${questionID}','${session}')`, function (err, result) {
					if (err) {
						res.status(400).json({ status: "failed" });
						console.log("Usermod bad request", err);
					}
					else {
						res.status(200).json({ status: "OK" });
						console.log("answer success.");
					}
				});
			}
		});
		connection.release();
	});
});

module.exports = router;
