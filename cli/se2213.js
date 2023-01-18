#! /usr/bin/env node
const commander = require("commander");
const axios = require ('axios');
const program = new commander.Command();

'use strict;'

/* 
 * All commands - administrative and functional, using 
 * commander. 
 * Commands call the implemented IntelliQ API 
 * endpoints utilizing axios for the API calls.
 * 
 * To install globally execute:
 * > npm install -g
 */ 



program 
    .description('Intelliq Command Line Tool');

// se2213 healthcheck

program
    .command('healthcheck')
    .description('Test the connection to the database server')
    .action(function(){
        let url='http://localhost:9103/inteliq_api/admin/healthcheck';
        axios.get(url).then( res =>{
            console.log(res.data);
        })
    });

// se2213 resetall

program // OK
    .command('resetall')
    .description('Truncate all tables in the database')
    .action(function(){
        let url='http://localhost:9103/inteliq_api/admin/resetall';
        axios.post(url).then( res=>{
            console.log(res.data);
        })
    });


/* ***********************************************
 * IN CASE OF IMPLEMENTATION OF /users & /usermod     
 * ***********************************************

program // needs work
    .command('admin')
    .description('Administrative actions for user handling ')
    .option('--usermod', 'Handle user accounts')
    .option('--username <username>', 'Specify username')
    .option('--passw <pwd>', 'The password')
    .option('--users <username>', 'Display useser status')
    .action((options) => {
        if (options.users != undefined) {
            let url=`http://localhost:9103/inteliq_api/admin/users/${options.users}`;
            axios.get(url).then( res=>{
                console.log(res.data);
            })
        }
        else if(options.usermod != undefined)
            console.error('To create user/change password use: se2213 admin --usermod --username <username> --passw <password>');
        else if(options.passesupd == undefined  && options.username != undefined && options.passw != undefined);
            let url=`http://localhost:9103/inteliq_api/admin/usermod/${options.username}/${options.passw}`;
            axios.post(url);
    });

 * ************************************************
 */

// se2213 questionnaire_upd --source <path>

program  // needs work!
    .command('quetionnaire_upd')
    .description('Add a questionnaire to the database')
    .requiredOption('--source <path>', 'The path to the json file to upload')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/admin/questionnaire_upd`;
        axios.post(url);
    });


// se2213 resetq --quesitonnaire_id <id>

program 
    .command('resetq')
    .description('Delete all answers associated with a questionnaire')
    .requiredOption('--questionnaire_id <id>', 'Specify the questionnaire')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/admin/resetq/${options.questionnaire_id}`;
        axios.post(url);
    });

// se2213 questionnaire --questionnaire_id <id> --format <format>

program 
    .command('questionnaire')
    .description('Displays information about a questionnaire.')
    .requiredOption('--questionnaire_id <id>', 'Specify the questionnaire')
    .requiredOption('--format <format>', 'Choose between JSON and csv')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/questionnaire/${options.questionnaire_id}?format=${options.format}`;
        axios.get(url).then( res=>{
            console.log(res.data);
        })
    }
    );

// se2213 question --questionnaire_id <id> --question_id <id> --format <json|csv>

program
    .command('question')
    .description('Displays information about a question of a questionnaire and its options.')
    .usage('Usage: se2213 question --questionnaire_id <questionnaire_id> --question_id <question_id')
    .requiredOption('--questionnaire_id <questionnaire_id>', 'Specify the questionnaire')
    .requiredOption('--question_id <question_id>', 'Specify the question')
    .requiredOption('--format <format>', 'Choose between JSON and csv')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/question/${options.questionnaire_id}/${options.question_id}?format=${options.format}`;
        axios.get(url).then( res=>{
            console.log(res.data);
        })
    });

// se2213 doanswer --questionnaire_id <id> --question_id <id> --session_id <id> --option_id <id> 

program
    .command('doanswer')
    .description('Register an answer to a question')
    .requiredOption('--questionnaire_id <questionnaire_id>', 'Specify the questionnaire')
    .requiredOption('--question_id <question_id>', 'Specify the question')
    .requiredOption('--session_id <session_id>', 'Specify the session')
    .requiredOption('--option_id <option_id>', 'The option chosen')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/doanswer/${options.questionnaire_id}/${options.question_id}/${options.session_id}/${options.option_id}`;
        axios.post(url);
    });

// se2213 getsessionanswers --quesitonnaire_id <id> --session_id <id> --format <json|csv>

program
    .command('getsessionanswers')
    .description('Displays all answers given during a session')
    .requiredOption('--questionnaire_id <questionnaire_id>', 'Specify the questionnaire')
    .requiredOption('--session_id <session_id>')
    .requiredOption('--format <format>')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/getsessionanswers/${options.questionnaire_id}/${options.session_id}?format=${options.format}`;
        axios.get(url).then( res=>{
            console.log(res.data);
        })
    });

// se2213 getquesitonanswers --quesitonnaire_id <id> --question_id <id> --format <json|csv>

program
    .command('getquestionanswers')
    .description('Returns the answers given for a question during all recorded sessions.')
    .requiredOption('--questionnaire_id <questionnaire_id>', 'Specify the questionnaire')
    .requiredOption('--question_id <question_id>', 'Specify the question')
    .requiredOption('--format [json|csv]', 'Choose between JSON and csv')
    .helpOption('-h, --help', 'Display help for command')
    .action((options) => {
        let url=`http://localhost:9103/inteliq_api/getquestionanswers/${options.questionnaire_id}/${options.question_id}?format=${options.format}`;
        axios.get(url).then( res => {
            console.log(res.data);
        })
    });


program.parse(process.argv);