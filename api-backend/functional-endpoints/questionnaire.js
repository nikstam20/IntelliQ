/* a. {baseURL}/questionnaire/:questionnaireID
Κλήση http GET η οποία επιστρέφει object που περιέχει τα γενικά στοιχεία και τις ερωτήσεις του
ερωτηματολογίου με αναγνωριστικό questionnaireID, ταξινομημένες ως προς το αναγνωριστικό της
ερώτησης. */

// TODO: require paths should be updated, waiting on the files & locations
// TODO: needs a lot of work

const { Router } = require('../node_modules/express');
const router = Router();
const { connect } = require('../connect');

router.post('/:questionnaireID', function(req, res) {
    const { questionnaireID } = req.params;
	connect(function(err, client, release) {
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database failed"});
				console.log(err);
		}
        var keywords;
        client.query("select keyword_text from Keyword where Questionnaire_questionnaire_id = $1", [questionnaireID], function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting keyword information."});
                console.log(err);
			}
			else {
                // TODO: does this work and is it a json list
		// result is an array of objects i believe , we can turn it into a json list like so: 
				//const keywordsJSON = JSON.stringify(keywords);
		//but i don't think we have to , response should contain arrays not json lists. then response is sent as a json list at the end - nikolas
				const keywords = result;
				
        	}
   		});
        // TODO: needs to be tested + ordered by dec -nat
		client.query("select questionnaire_id, title from Questionnaire where questionnaire_id = $1 order by question_id desc;", [questionnaireID], function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting questionnaire information."});
                console.log(err);
			}
			else {
				//make array of questions in questionnaire
   				const questions = [];
    				for (const row of result.rows) {
      					const question = { qID: row.question_id };
      					questions.push(question);
    				}
				
				//generate response
				const response = {
						"questionnaireID":questionnaireID,
						"questionnaireTitle":title, //edw eixe questionID anti gia title, unless im missing something 8a prepe na nai title -nikolas
						"keywords": keywords,
						"questions": questions
						/*"questions": {
                            				"qID": result.question_id,       // ...?
                       				}*/
					}	
				if(req.query.format === "csv") {
					const csvHeader = ['questionnaireID,questionnaireTitle,keywords,questions'];
					const csvObj = { csvHeader };
					var csvData = parse(response, data_opts);
					res.status(200).send(csvData);
					console.log("Questionnaire info OK.");
				}
				else {
                    // JSON response: default if no query format specified.
                    // TODO: result.[] ?, test -nat
					
					res.status(200).json(response);
					console.log("Questionnaire info OK.");
				}
        	}
   		});
		release();
	});
});

module.exports = router;
