const express = require('../node_modules/express');
const router = express.Router();
const pool  = require('../connect');
const { parse } = require('../node_modules/json2csv');

router.get('/:questionnaireID', function(req, res) {
	res.status(400).json({status:"failed", reason: "Missing required parameter."});
});

router.get('/:questionnaireID/:session', function(req, res) {
	
    const { questionnaireID, session } = req.params;

	pool.getConnection(function(err, connection) {
//fasfwaf
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
			console.log(err);
		}
		else{
            q = `select Answer.answer_id, Option.Question_question_id from Answer inner join mydb.Option ON Answer.Option_option_id = mydb.Option.option_id where (Option.Question_Questionnaire_questionnaire_id= ${questionnaireID} AND Answer.Session_session_id = "${session}")`;		
            connection.query(q, function(err, result) {

        	if(err) {
				res.status(400).json({status:"failed", reason: "Error getting question information."});
                console.log(err);
			}
			else if(result==0) {
				res.status(204).json({status:"failed", reason: "This session does not exist."});
                console.log("getsessionanswers query no data");
			}
			else if (result) {
   				const answers = [];
    			for (const row of result) {
      				const answer = { qid: row.Question_question_id, ans: row.answer_id };
      				answers.push(answer);
    			}
				console.log(answers);

				if(req.query.format === "csv") {
					const csv_input = [];
					for (const row of result) {
						const inputty = {
							"questionnaireID":questionnaireID.toString(),
							"session":session.toString(),
							"qid":row.Question_question_id.toString(),
							"ans":row.answer_id.toString(),
					}
					csv_input.push(inputty)
				}

					const csvHeader = ['questionnaireID,session,qid,ans'];
                    const csvObj = { csvHeader };
                    var csvData = parse(csv_input, csvObj);
                    res.status(200).send(csvData);
                    console.log("Question info OK.");
				}
				else {
					const input = {
						"questionnaireID":questionnaireID.toString(),
						"session":session.toString(),
						"answers":answers
				}
					const json = JSON.stringify(input);
               		const response = JSON.parse(json, (key, val) => (
                    	typeof val !== 'object' && val !== null ? String(val) : val
                  ));
					
                    // JSON response: default if no query format specified.					
					res.status(200).json(response);
					console.log("Question info OK.");
				}

        	}	
   		});
	}
	connection.release();
	});

});


module.exports = router;
