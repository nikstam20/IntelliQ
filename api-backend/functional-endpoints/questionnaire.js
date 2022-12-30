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
				const keywords = result;

        	}
   		});
        // TODO: needs to be tested + ordered by dec -nat
		client.query("select questionnaire_id, title from Questionnaire where questionnaire_id = $1;", [questionnaireID], function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting questionnaire information."});
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
						"questionnaireTitle":questionID,
						"keywords": keywords,
						"questions": {
                            "qID": result.question_id,       // ...?
                        }

					}	
					res.status(200).json(response);
					console.log("Questionnaire info OK.");
				}
        	}
   		});
		release();
	});
});

module.exports = router;
