// TODO: require paths should be updated, waiting on the files & locations


const express = require('../node_modules/express');
const router = express.Router();
const pool  = require('../connect');

router.get('/:questionnaireID/:questionID', function(req, res) {
	console.log("geoageaoaga");
	console.log("hi i am in question");
    const { questionnaireID, questionID } = req.params;
	//res.send(questionnaireID+" "+questionID);
	pool.connect(function(err) {
		console.log("geia bhka sto database");
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
			console.log(err);
		}

        // TODO: needs to be tested + ordered by dec -nat
		else{
		q = `select Question.question_text, required, Question.type, Option.option_id, Option.option_text, Option.Question_nextquestion_id from Question inner join Option ON Question.question_id = Option.Question_question_id where (Question.Questionnaire_questionnaire_id = ${questionnaireID} AND Question.question_id = ${questionID})`;	
		pool.query(q, function(err, result) 
		{
		console.log("to query egine");
        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting question information."});
                console.log(err);
			}
			else {
				//make array of options 
				console.log("to query egine swsta");
				console.log(result);
				//res.send(result);

   				const question = [];
    				for (const row of result) {
      					const options = { optID: row.option_id, opttxt: row.option_text, nextqID: row.Question_nextquestion_id };
      					question.push(options);
						//console.log(options)
    				}
				 console.log(question);	
				 res.send(question);
				//generate response
				const response = {
						"questionnaireID":questionnaireID,
						"qID":questionID,
						"qtext":result.question_text,
						"required":result.required,
						"type":result.type,
                        //"options":options
					//result.rows //only some columns?
				}
				// if(req.query.format === "csv") {
				// 	const csvHeader = ['questionnaireID,qID,qtext,required,type,options'];
				// 	const csvObj = { csvHeader };
				// 	var csvData = parse(response, data_opts);
				// 	res.status(200).send(csvData);
				// 	console.log("Question info OK.");
				// }
				// else {
                //     // JSON response: default if no query format specified.
                //     // TODO: result.[] ?, test -nat						
				// 	res.status(200).json(response);
				// 	console.log("Question info OK.");
				// }

        	}
   		});
	}
		//pool.release();
	});
});

module.exports = router;
