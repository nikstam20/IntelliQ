// TODO: require paths should be updated, waiting on the files & locations

const express = require('../node_modules/express');
const router = express.Router();
const pool  = require('../connect');
const { parse } = require('../node_modules/json2csv');

router.get('/:questionnaireID/:questionID', function(req, res) {
	
    const { questionnaireID, questionID } = req.params;
	pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
			console.log(err);
		}

        // TODO: needs to be ordered by dec -nat
		else{
		q = `select Question.question_text, Question.required, Question.type, Option.option_id, Option.option_text, Option.Question_nextquestion_id from Question inner join Option ON Question.question_id = Option.Question_question_id where (Question.Questionnaire_questionnaire_id = ${questionnaireID} AND Question.question_id = ${questionID} AND Option.Question_Questionnaire_questionnaire_id = ${questionnaireID})`;	
		connection.query(q, function(err, result) {

        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting question information."});
                console.log(err);
			}
			else {
   				const options = [];
    			for (const row of result) {
      				const option = { optID: row.option_id, opttxt: row.option_text, nextqID: row.Question_nextquestion_id };
      				options.push(option);
					question_text = row.question_text;
					required = row.required;
					type = row.type;
    			}
				
				console.log(options);

				//generate response

				  
				if(req.query.format === "csv") {
					const csv_input = [];
					for (const row of result) {
						const inputty = {
							"questionnaireID":questionnaireID,
							"qID":questionID,
							"qtext":row.question_text,
							"required":row.required,
							"type":row.type,
                     		"optID": row.option_id.toString(),
							"opttxt": row.option_text,
							"nextqID": row.Question_nextquestion_id.toString()
					}
					csv_input.push(inputty)
				}

					const csvHeader = ['questionnaireID,qID,qtext,required,type,optID,opttxt,nextqID'];
                    const csvObj = { csvHeader };
                    var csvData = parse(csv_input, csvObj);
                    res.status(200).send(csvData);
                    console.log("Question info OK.");
				}
				else {
					const input = {
						"questionnaireID":questionnaireID.toString(),
						"qID":questionID.toString(),
						"qtext":question_text.toString(),
						"required":required,
						"type":type,
                        "options":options
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
