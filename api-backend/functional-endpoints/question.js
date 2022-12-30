// TODO: require paths should be updated, waiting on the files & locations


import { Router } from '../express';
const router = Router();
import { connect } from '../connect';

router.post('/:questionnaireID/:questionID', function(req, res) {
    const { questionnaireID, questionID } = req.params;
	connect(function(err, client, release) {
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
				console.log(err);
		}

        // TODO: needs to be tested + ordered by dec -nat
		client.query("select Question.question_text, required, Question.type, Option.option_id, Option.option_text from Question inner join Option ON Question.question_id = Option.question_id where (Question.Questionnaire_questionnaire_id = $1 AND Question.question_id = $2);", [questionnaireID, questionID], function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting question information."});
                console.log(err);
			}
			else {
				if(req.query.format === "csv") {
					// TODO: csv
				}
				else {
                    // JSON response: default if no query format specified.
                    // TODO: result.[] ?, test -nat
					const response = {
						"questionnaireID":questionnaireID,
						"qID":questionID,
						"qtext":result.question_text,
						"required":result.required,
						"type":result.type,
                        "options": result.rows //only some columns?
					}	
					res.status(200).json(response);
					console.log("Question info OK.");
				}
        	}
   		});
		release();
	});
});

export default router;