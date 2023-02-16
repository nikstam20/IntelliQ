const { exec } = require("child_process");

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
  }

async function presentation() {
    console.log("Going to execute: se2213 healthcheck\n");
    await keypress();
    exec("se2213 healthcheck", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Going to present First Questionnaire\n Executing se2213 questionnaire --questionnaire_id 1 --format JSON\n");
    });
    await keypress();
    exec("se2213 questionnaire --questionnaire_id 1 --format JSON", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Going to answer the six questions (of the specific route of the questionnaire)\n Executing se2213 doanswer --questionnaire_id 1 --question_id 1 --session_id bbbb --option_id 1\n");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 1 --session_id bbbb --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion\n Executing se2213 doanswer --questionnaire_id 1 --question_id 2 --session_id bbbb --option_id 4\n");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 2 --session_id bbbb --option_id 4", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 4, now going to next question\n Executing se2213 doanswer --questionnaire_id 1 --question_id 3 --session_id bbbb --option_id 1\n");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 3 --session_id bbbb --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion\n Executing se2213 doanswer --questionnaire_id 1 --question_id 4 --session_id bbbb --option_id 1\n");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 4 --session_id bbbb --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion\n Executing se2213 doanswer --questionnaire_id 1 --question_id 5 --session_id bbbb --option_id 1\n");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 5 --session_id bbbb --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion\n Execute se2213 doanswer --questionnaire_id 1 --question_id 6 --session_id bbbb --option_id 4\n");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 6 --session_id bbbb --option_id 4", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 4, questionnaire finished. Going to get answers for question 2 of the questionnaire\n Execute se2213 getquestionanswers --questionnaire_id 1 --question_id 2 --format JSON\n");
    });
    await keypress();
    exec("se2213 getquestionanswers --questionnaire_id 1 --question_id 2 --format JSON", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Going to resetall\n Executing se2213 resetall\n");
    });
    await keypress();
    exec("se2213 resetall", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Going to upload new questionnaire\n Executing se2213 questionnaire_upd --source ./data/import_questionnaires/example2_questionnaire.json\n");
    });
    await keypress();
    exec("se2213 questionnaire_upd --source ./data/import_questionnaires/example2_questionnaire.json", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Going to present new questionnaire\n Executing se2213 questionnaire --questionnaire_id 2 --format JSON\n");
    });
    await keypress();
    exec("se2213 questionnaire --questionnaire_id 2 --format JSON", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("The end :) Press ctrl + C to terminate.");
    });
}

presentation();
