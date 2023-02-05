const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');   

router.post('/', function(req, res) {
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("connection failed", err);
			return res.status(500).json({status:"failed"});
				
		}
        connection.query("SET FOREIGN_KEY_CHECKS=0;", function(err)
        {
            if(err) { 
				console.log(err);
                return res.status(400).json({status:"failed", reason: "Could not turn off foreign key checks."});
               
            }
        })
		// connection.query("TRUNCATE TABLE User", function(err) 
		// {
        // 	if(err) {
		// 		return res.status(400).json({status:"failed", reason: "Table User not truncated"});
        //         console.log(err);
		// 	}
		// 	else {
        //         console.log("Table User truncated");
		// 	}
		// })
        connection.query("TRUNCATE TABLE Keyword", function(err) 
		{
        	if(err) {
				console.log(err);
				return res.status(400).json({status:"failed", reason: "Table Keyword not truncated"});
			}
			else {
                console.log("Table Keyword truncated");
			}
		})
        connection.query("TRUNCATE TABLE Answer", function(err) 
		{
        	if(err) {
				console.log(err);
				return res.status(400).json({status:"failed", reason: "Table Answer not truncated"}); 
			}
			else {
                console.log("Table Answer truncated");
			}
		})
        connection.query("TRUNCATE TABLE Session", function(err) 
		{
        	if(err) {
				console.log(err);
				return res.status(400).json({status:"failed", reason: "Table Session not truncated"});
			}
			else {
                console.log("Table Session truncated");
			}
		})
        connection.query("TRUNCATE TABLE Option", function(err) 
		{
        	if(err) {
				console.log(err);
				return res.status(400).json({status:"failed", reason: "Table Option not truncated"});
			}
			else {
                console.log("Table Option truncated");
			}
		})
        connection.query("TRUNCATE TABLE Question", function(err) 
		{
        	if(err) {
				console.log(err);
				return res.status(400).json({status:"failed", reason: "Table Question not truncated"});
			}
			else {
                console.log("Table Question truncated");
			}
		})
        connection.query("TRUNCATE TABLE Questionnaire", function(err) 
		{
        	if(err) {
				console.log(err);
				return res.status(500).json({status:"failed", reason: "Table Questionnaire not truncated"});
			}
			else {
                console.log("Table Questionnaire truncated");
			}
		})
        connection.query("SET FOREIGN_KEY_CHECKS=1;", function(err)
        {
            if(err) {
                console.log(err);
				return res.status(500).json({status:"failed", reason: "Could not turn foreign key checks back on."}); 
            }
			else {
				res.status(200).json({status:"OK"});
                console.log("All tables trunctated successfully.");
			}
        })
        ;
		connection.release();
	});
});

module.exports = router;
