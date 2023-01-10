// TODO: require paths should be updated, waiting on the files & locations


const express = require('../node_modules/express');
const router = express.Router();
const pool  = require('../connect');
//const { parse } = require('../api-backend/node_modules/json2csv');

router.get('/:questionnaireID/:questionID', function(req, res) {
	
    const { questionnaireID, questionID } = req.params;
	//res.send(questionnaireID+" "+questionID);
	pool.getConnection(function(err, connection) {

		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
			console.log(err);
		}

        // TODO: needs to be tested + ordered by dec -nat
		else{
		q = `select Question.question_text, required, Question.type, Option.option_id, Option.option_text, Option.Question_nextquestion_id from Question inner join Option ON Question.question_id = Option.Question_question_id where (Question.Questionnaire_questionnaire_id = ${questionnaireID} AND Question.question_id = ${questionID})`;	
		pool.query(q, function(err, result) {

        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting question information."});
                console.log(err);
			}
			else {
   				const options = [];
    			for (const row of result) {
      				const option = { optID: row.option_id, opttxt: row.option_text, nextqID: row.Question_nextquestion_id };
      				options.push(option);
    			}
				
				console.log(options);

				//generate response
				const response = {
						"questionnaireID":questionnaireID,
						"qID":questionID,
						"qtext":result.question_text,
						"required":result.required,
						"type":result.type,
                        "options":options
					//result.rows //only some columns?
				}

				if(req.query.format === "csv") {
					const csvHeader = ['questionnaireID,qID,qtext,required,type,options'];
					const csvObj = { csvHeader };
					var csvData = parse(response, data_opts);
					res.status(200).send(csvData);
					console.log("Question info OK.");
				}
				else {
                    // JSON response: default if no query format specified.					
					res.status(200).json(response);
					console.log("Question info OK.");
				}

        	}	
   		});
	}
		//release();
	});

});


module.exports = router;
