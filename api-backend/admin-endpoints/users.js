const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');
const { parse } = require('../node_modules/json2csv');

router.get('/:username', function(req, res) {
    const { username } = req.params;
    pool.getConnection(function(err, connection) {
        if(err) {
            res.status(500).json({status:"failed", reason: "Connection to database could not be established."});
            console.log(err);
        }

        else{
        q = `select username from User where username = '${username}'`;

        connection.query(q, function(err, result) {

            if(err) {
                res.status(500).json({status:"failed", reason: "Error getting user information."});
                console.log(err);
            }
            else {

                if(result.length == 0) {
                    // Empty set response.
                    res.status(204).json({status:"failed", reason: "No data for user."});
                        console.log("No user is registered under the requested username.");
                }
                
                else {
                    // User exists in the database.
                    if(req.query.format === "csv") {
                        const csv_input = [];
                        for (const row of result) {
                            const inputty = {
                                "username":row.username,
                        }
                        csv_input.push(inputty)
                    }

                        const csvHeader = ['username'];
                        const csvObj = { csvHeader };
                        var csvData = parse(csv_input, csvObj);
                        res.status(200).send(csvData);
                        console.log("User info OK.");
                    }
                    else {
                        const input = {
                            "username":username,
                    }
                        const json = JSON.stringify(input);
                            const response = JSON.parse(json, (key, val) => (
                            typeof val !== 'object' && val !== null ? String(val) : val
                        ));
                        // JSON response: default if no query format specified.					
                        res.status(200).json(response);
                        console.log("User info OK.");
                    }
                }
            }	
            });
    }
    connection.release();
    });
});

module.exports = router;