/* a. {baseURL}/questionnaire/:questionnaireID
Κλήση http GET η οποία επιστρέφει object που περιέχει τα γενικά στοιχεία και τις ερωτήσεις του
ερωτηματολογίου με αναγνωριστικό questionnaireID, ταξινομημένες ως προς το αναγνωριστικό της
ερώτησης. */

const express = require('../node_modules/express');
const router = express.Router();
const pool  = require('../connect');
const { parse } = require('../node_modules/json2csv');

router.get('/:questionnaireID', function(req, res) {
	
    const { questionnaireID } = req.params;

	pool.getConnection(function(err, connection) {
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
			console.log(err);
		}
		
		else{
            q = `select Questionnaire.title, Keyword.keyword_text, Question.question_id, Question.question_text, Question.required, Question.type from Questionnaire inner join Keyword ON Questionnaire.questionnaire_id = Keyword.Questionnaire_questionnaire_id inner join  Question ON Question.Questionnaire_questionnaire_id = Questionnaire.questionnaire_id where (Questionnaire.questionnaire_id= ${questionnaireID}) ORDER BY Question.question_id, keyword_text;`;		
            connection.query(q, function(err, result) {

        	if(err) {
				res.status(400).json({status:"failed", reason: "Error getting questionnaire information."});
                console.log(err);
			}
			else if(result == 0) {
				//res.setHeader('Status-Message', 'Nodata' )
				res.status(204);
                console.log("questionnaire query no data");
			}
			else if (result) {
   				const questions = [];
				const keywords = [];
				var  qid_last = -1;
				var kwrd_first = result[0].keyword_text;
				var passed = false;
    			for (const row of result) {
					if(row.question_id != qid_last){
      					const question = { qid: row.question_id, qtext: row.question_text, required: row.required, type: row.type };
      					questions.push(question);
						title = row.title;
						qid_last=row.question_id;
					}
    			}
				for (const row of result) {
					if(row.keyword_text == kwrd_first && passed) break;
					const keyw = {keyword: row.keyword_text};
					keywords.push(keyw);
					passed = true;
				}
				
				if(req.query.format === "csv") {
					const csv_input = [];
					for (const row of result) {
						const inputty = {
							"questionnaireID":questionnaireID.toString(),
							"questionnaireTitle":row.title.toString(),
							"keywords":row.keyword_text,
							"qid":row.question_id.toString(),
							"qtext":row.question_text,
							"required":row.required,
							"type":row.type
					}
					csv_input.push(inputty)
				}

					const csvHeader = ['questionnaireID,questionnaireTitle,keywords,qid, qtext, required, type'];
                    const csvObj = { csvHeader };
                    var csvData = parse(csv_input, csvObj);
                    res.status(200).send(csvData);
                    console.log("Questionnaire info OK.");
				}
				else {
					const input = {
						"questionnaireID":questionnaireID.toString(),
						"questionnaireTitle":title,
						"keywords":keywords,
						"questions":questions
				}
					const json = JSON.stringify(input);
               		const response = JSON.parse(json, (key, val) => (
                    	typeof val !== 'object' && val !== null ? String(val) : val
                  ));
           
                    // JSON response: default if no query format specified.					
					res.status(200).json(response);
					console.log("Questionnaire info OK.");
				}

        	}	
   		});
	}
	connection.release();
	});

});


module.exports = router;
