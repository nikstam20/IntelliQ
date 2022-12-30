/* a. {baseURL}/questionnaire/:questionnaireID
Κλήση http GET η οποία επιστρέφει object που περιέχει τα γενικά στοιχεία και τις ερωτήσεις του
ερωτηματολογίου με αναγνωριστικό questionnaireID, ταξινομημένες ως προς το αναγνωριστικό της
ερώτησης. */
const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');

module.exports = router;