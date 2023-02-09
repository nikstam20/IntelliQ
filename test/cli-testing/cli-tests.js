const { spawn } = require('child_process');
const assert = require('chai').assert;

//TEST questionnaire CALL, 5 questionnaires total
describe('se2213 questionnaire --questionnaire_id <id> --format <json>', function () {
  //TEST QUESTIONNAIRES WITH ID 1,...,5
  for (let i = 1; i < 6; i++) {
    it(`should return status: OK (id = ${i})`, function (done) {
      const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--format', 'json']);
      let output = '';

      cli.stdout.on('data', function (data) {
        output += data.toString();
      });

      cli.on('close', function (code) {
        assert.equal(code, 0);
        assert.notInclude(output, 'failed');
        done();
      });
    });
    //test if the json output has the correct keys
    it(`should contain the proper keys (id = ${i})`, function (done) {
      const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--format', 'json']);
      let output = '';
      cli.stdout.on('data', function (data) {
        output += data.toString();
      });
      
      cli.on('close', function (code) {
        assert.equal(code, 0);
        assert.include(output, 'questionnaireID:');
        assert.include(output, 'questionnaireTitle:');
        assert.include(output, 'keywords:');
        assert.include(output, 'questions:');
        done();
      });
    });
    //test if questionnaire has questions
    it(`should contain data (id = ${i})`, function (done) {
      const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--format', 'json']);
      let output = '';
      
      cli.stdout.on('data', function (data) {
        output += data.toString();
      });
      
      cli.on('close', function (code) {
        assert.equal(code, 0);
        assert.include(output, 'keyword');
        assert.include(output, 'qid');
        assert.include(output, 'qtext');
        assert.include(output, 'required');
        done();
      });
    });
  }
});

describe('se2213 questionnaire --questionnaire_id <id = 1> --format <csv>', function () {
  for (let i = 1; i < 6; i++) {
    it(`should return status: OK (id = ${i})`, function (done) {
      const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--format', 'csv']);
      let output = '';

      cli.stdout.on('data', function (data) {
        output += data.toString();
      });

      cli.on('close', function (code) {
        assert.equal(code, 0);
        assert.notInclude(output, 'failed');
        done();
      });
    });
    //test if the csv output has the correct labels
    it(`should contain the correct labels (id = ${i})`, function (done) {
      const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--format', 'csv']);
      let output = '';
      cli.stdout.on('data', function (data) {
        output += data.toString();
      });
      
      cli.on('close', function (code) {
        assert.equal(code, 0);
        assert.include(output, 'questionnaireID');
        assert.include(output, 'questionnaireTitle');
        assert.include(output, 'keywords');
        assert.include(output, 'qid');
        assert.include(output, 'qtext');
        assert.include(output, 'required');
        assert.include(output, 'type');
        done();
      });
    });
  }
});


//TEST question CALL, 5 questions from 5 questionnaires
describe('se2213 question --questionnaire_id <id> --question_id <id> --format <json>', function () {
  for (let i = 1; i < 6; i++) {
    for (let j=1; j < 6; j++){
      it(`should return status: OK (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--question_id', j, '--format', 'json']);
        let output = '';
  
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
  
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.notInclude(output, 'failed');
          done();
        });
      });
      //test if the json output has the correct keys
      it(`should contain the proper keys (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'question', '--questionnaire_id', '1', '--question_id', '2', '--format', 'json']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'questionnaireID:');
          assert.include(output, 'qID:');
          assert.include(output, 'qtext:');
          assert.include(output, 'required:');
          assert.include(output, 'type:');
          assert.include(output, 'options');
          done();
        });
      });
      it(`should contain data (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'question', '--questionnaire_id', '1', '--question_id', '2', '--format', 'json']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'optID:');
          assert.include(output, 'opttxt:');
          assert.include(output, 'nextqID:');
          done();
        });
      });
    }
  }
});

describe('se2213 question --questionnaire_id <id = 1> --question_id <id = 2> --format <csv>', function () {
  for (let i = 1; i < 6; i++) {
    for (let j=1; j < 6; j++){
      it(`should return status: OK (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--question_id', j, '--format', 'csv']);
        let output = '';
  
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
  
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.notInclude(output, 'failed');
          done();
        });
      });

      it('should contain the proper labels', function (done) {
        const cli = spawn('node', ['./se2213.js', 'questionnaire', '--questionnaire_id', i, '--question_id', j, '--format', 'csv']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'questionnaireID');
          assert.include(output, 'qID');
          assert.include(output, 'qtext');
          assert.include(output, 'required');
          assert.include(output, 'type');
          assert.include(output, 'optID');
          assert.include(output, 'opttxt');
          assert.include(output, 'nextqID');
          done();
        });
      });
    }
  }
});


//TEST getquestionanswers CALL, 5 questions from 5 questionnaires
describe('se2213 getquestionanswers --questionnaire_id <id> --question_id <id> --format <json>', function () {
  for (let i = 1; i < 6; i++) {
    for (let j=1; j < 6; j++) {
      it(`should return status: OK (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getquestionanswers', '--questionnaire_id', i, '--question_id', j, '--format', 'json']);
        let output = '';
  
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
  
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.notInclude(output, 'failed');
          done();
        });
      });
      it(`should contain the proper keys (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getquestionanswers', '--questionnaire_id', i, '--question_id', j, '--format', 'json']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'questionnaireID:');
          assert.include(output, 'questionID:');
          assert.include(output, 'answers:');
          done();
        });
      });
      it(`should contain data (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getquestionanswers', '--questionnaire_id', i, '--question_id', j, '--format', 'json']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'session:');
          assert.include(output, 'ans:');
          done();
        });
      });
    }
  }
});

describe('se2213 getquestionanswers --questionnaire_id <id> --question_id <id> --format <csv>', function () {
  for (let i = 1; i < 6; i++) {
    for (let j=1; j < 6; j++) {
      it(`should return status: OK (questionnaire = ${i}, qid = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getquestionanswers', '--questionnaire_id', i, '--question_id', j, '--format', 'csv']);
        let output = '';
  
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
  
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.notInclude(output, 'failed');
          done();
        });
      });
      it('should contain the proper labels (questionnaire = ${i}, qid = ${j})', function (done) {
        const cli = spawn('node', ['./se2213.js', 'getquestionanswers', '--questionnaire_id', i, '--question_id', j, '--format', 'csv']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'questionnaireID');
          assert.include(output, 'questionID');
          assert.include(output, 'session');
          assert.include(output, 'ans');
          done();
        });
      });
    }
  }
});

//TEST getsessionanswers CALL, 5 sessions from 5 questionnaires
describe('se2213 getsessionanswers --questionnaire_id <id> --session_id <id> --format <json>', function () {
  for (let i = 1; i < 6; i++) {
    for (let j=1; j < 6; j++) {
      it(`should return status: OK (questionnaire = ${i}, session = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getsessionanswers', '--questionnaire_id', i, '--session_id', j, '--format', 'json']);
        let output = '';
  
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
  
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.notInclude(output, 'failed');
          done();
        });
      });
      it(`should contain the proper keys (questionnaire = ${i}, session = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getsessionanswers', '--questionnaire_id', i, '--session_id', j, '--format', 'json']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'questionnaireID:');
          assert.include(output, 'session:');
          assert.include(output, 'answers:');
          done();
        });
      });
      it(`should contain data (questionnaire = ${i}, session = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getsessionanswers', '--questionnaire_id', i, '--session_id', j, '--format', 'json']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'qid:');
          assert.include(output, 'ans:');
          done();
        });
      });
    }
  }
});

describe('se2213 getsessionanswers --questionnaire_id <id> --session_id <id> --format <csv>', function () {
  for (let i = 1; i < 6; i++) {
    for (let j=1; j < 6; j++) {
      it(`should return status: OK (questionnaire = ${i}, session = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getsessionanswers', '--questionnaire_id', i, '--session_id', j, '--format', 'csv']);
        let output = '';
  
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
  
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.notInclude(output, 'failed');
          done();
        });
      });
      it(`should contain the proper keys (questionnaire = ${i}, session = ${j})`, function (done) {
        const cli = spawn('node', ['./se2213.js', 'getsessionanswers', '--questionnaire_id', i, '--session_id', j, '--format', 'csv']);
        let output = '';
        cli.stdout.on('data', function (data) {
          output += data.toString();
        });
        
        cli.on('close', function (code) {
          assert.equal(code, 0);
          assert.include(output, 'questionnaireID');
          assert.include(output, 'session');
          assert.include(output, 'qid');
          assert.include(output, 'ans');
          done();
        });
      });
    }
  }
});

//test for healthcheck
describe('se2213 healthcheck', function () {
  it('should show status and dbconnection', function (done) {
    const cli = spawn('node', ['./se2213.js', 'healthcheck']);
    let output = '';
    
    cli.stdout.on('data', function (data) {
      output += data.toString();
    });
    
    cli.on('close', function (code) {
      assert.equal(code, 0);
      assert.match(output, /status: '(OK|failed)'/);
      assert.include(output, 'dbconnection: \'mysql://root:password@localhost:port/intelliq\'');
      done();
    });
  });
});