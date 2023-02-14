const { exec } = require("child_process");

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
  }

async function presentation() {
    exec("se2213 questionnaire_upd --source ./data/import_questionnaires/example_questionnaire_1.json", (error, stdout, stderr) => {
        console.log("Uploading first questionnaire");
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Going to run Database Healthcheck");
    });
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
        console.log("Going to present First Questionnaire");
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
        console.log("Going to answer the six questions (of the specific route of the questionnaire)");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 1 --session_id aaaa --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 2 --session_id aaaa --option_id 4", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 4, now going to nextquestion");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 3 --session_id aaaa --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 4 --session_id aaaa --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 5 --session_id aaaa --option_id 1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 1, now going to nextquestion");
    });
    await keypress();
    exec("se2213 doanswer --questionnaire_id 1 --question_id 6 --session_id aaaa --option_id 4", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("Answered Option 4, questionnaire finished. Going to get answers for question 2 of the questionnaire");
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
        console.log("Going to resetall");
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
        console.log("Going to upload new questionnaire");
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
        console.log("Going to present new questionnaire");
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
        console.log("The End.");
    });
}


presentation();