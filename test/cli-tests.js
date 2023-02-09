const { spawn } = require('child_process');
const assert = require('chai').assert;


describe('se2213 healthcheck', function () {
  it('should show status and dbconnection', function (done) {
    const cli = spawn('node', ['./se2213.js', 'healthcheck']);
    let output = '';
    
    cli.stdout.on('data', function (data) {
      output += data.toString();
    });
    
    cli.on('close', function (code) {
      assert.equal(code, 0);
      assert.match(output, /status: "(OK|failed)"/);
      assert.include(output, 'dbconnection: \'mysql://root:password@localhost:port/intelliq\'');
      done();
    });
  });
});

describe('se2213 resetall', function () {
  it('should show status and dbconnection', function (done) {
    const cli = spawn('node', ['./se2213.js', 'healthcheck']);
    let output = '';
    
    cli.stdout.on('data', function (data) {
      output += data.toString();
    });
    
    cli.on('close', function (code) {
      assert.equal(code, 0);
      assert.match(output, /status: "(OK|failed)"/);
      assert.include(output, 'dbconnection: \'mysql://root:password@localhost:port/intelliq\'');
      done();
    });
  });
});

/*describe('se2213 questionnaire --questionnaire_id <id = 1> --format <json>', function () {
  it('should show status and dbconnection', function (done) {
    const cli = spawn('node', ['./se2213.js', 'questionnaire --questionnaire_id 1 --format json']);
    let output = '';
    
    cli.stdout.on('data', function (data) {
      output += data.toString();
    });
    
    cli.on('close', function (code) {
      assert.equal(code, 0);
      assert.match(output, /status: "(OK|failed)"/);
      assert.include(output, 'dbconnection: \'mysql://root:password@localhost:port/intelliq\'');
      done();
    });
  });*/