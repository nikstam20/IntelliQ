<!-- CLI TESTING -->
## CLI Testing

Functionality tests for the command line interface Chai and Mocha.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Install the cli globally. Go to ~/SoftEng22-13/cli and type:
  ```sh
  npm install -g
  ```
* Install child_process and chai. Go to ~/SoftEng22-13/test/cli-testing and type:
  ```sh
  npm child_process, chai
  ```

### How to run
Simply type:
  ```sh
  mocha ./cli-tests.js
  ```
### What it does
This script performs a test on intelliQ's cli calls. It performs them on a database of 5 questionnaires with ~10 questions and ~7 answer sessions each. The following things are tested:
1. (json && csv) Return status: 'OK'
2. (json) The return object has the correct keys (i.e. if it calls /questionnaire it checks whether it contains "questionnaireID" etc.)
3. (json) The return object has data (i.e. if it calls /questionnaire it checks whether it contains questions, if it calls /question it checks whether it contains options etc.)
4. (csv) The return object has the correct labels.