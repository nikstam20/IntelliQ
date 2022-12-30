// TODO: require paths should be updated, waiting on the files & locations

const express = require('../express');
const router = express.Router();
const pool = require('../connect');   

router.post('/', function(req, res) {
	pool.connect(function(err, client, release) {
		if(err) {
			res.status(500).json({status:"failed"});
				console.log("connection failed", err);
		}
        client.query("SET FOREIGN_KEY_CHECKS=0;", function(err)
        {
            if(err) {
                res.status(500).json({status:"failed", reason: "Could not turn off foreign key checks."});
                console.log(err);
            }
        })
		client.query("TRUNCATE TABLE User", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table User not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table User truncated");
			}
		})
        client.query("TRUNCATE TABLE Keyword", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table Keyword not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table Keyword truncated");
			}
		})
        client.query("TRUNCATE TABLE Answer", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table Answer not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table Answer truncated");
			}
		})
        client.query("TRUNCATE TABLE Session", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table Session not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table Session truncated");
			}
		})
        client.query("TRUNCATE TABLE Option", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table Option not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table Option truncated");
			}
		})
        client.query("TRUNCATE TABLE Question", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table Question not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table Question truncated");
			}
		})
        client.query("TRUNCATE TABLE Questionnaire", function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Table Questionnaire not truncated"});
                console.log(err);
			}
			else {
				res.status(200).json({status:"OK"});
                console.log("Table Questionnaire truncated");
			}
		})
        client.query("SET FOREIGN_KEY_CHECKS=1;", function(err)
        {
            if(err) {
                res.status(500).json({status:"failed", reason: "Could not turn foreign key checks back on."});
                console.log(err);
            }
        })
        ;
		release();
	});
});

module.exports = router;