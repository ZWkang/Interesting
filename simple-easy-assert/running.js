const chalk =  require("chalk")



const testCases = []
function test(title, cb) {
  testCases.push({
    title,
    cb
  })
}

let successTotal = 0;
let failTotal = 0;

let failCase = [];

function run() {
  for(const testCase of testCases) {
    const { title, cb } = testCase;
    try {
      cb.call(this);
      successTotal += 1;
    }catch(e) {
      failTotal += 1;
      failCase.push({
        reason: e.message,
        actual: e.actual,
        expected: e.expected,
        title
      })
    }
  }

    console.log(`${chalk.green(`Total Test Total: ${successTotal + failTotal}`)}    
Tests Suites: ${chalk.green(`${successTotal} total passed`)}
Tests Suites: ${chalk.red(`${failTotal} total failed`)}
`)


  for(const fail of failCase) {
console.log(`
Test Case: ${fail.title}
Fail reason: ${chalk.red(`${fail.reason}`)}
${chalk.green(`expected ---=>  ${fail.expected}`)}
${chalk.red(`actual   ---=>  ${fail.actual}`)}
`)
  }
}
global.test = test;

require('./index');

run()