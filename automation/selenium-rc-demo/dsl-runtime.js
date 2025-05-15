let currentCommands = [];
let currentSuite = '';

function describe(name, fn) {
  currentSuite = name;
  fn(); // run child test cases
}

function it(name, fn) {
  console.log(`[RUN] ${currentSuite} - ${name}`);
  currentCommands = []; // reset for this test
  fn();
}

function type(selector, text) {
  currentCommands.push({ command: 'type', payload: { selector, text } });
}
function click(selector) {
  currentCommands.push({ command: 'click', payload: { selector } });
}
function wait(ms) {
  currentCommands.push({ command: 'wait', payload: { ms } });
}
function assertText(selector, expected) {
  currentCommands.push({ command: 'assertText', payload: { selector, expected } });
}

module.exports = {
  runTestFile(filepath) {
    currentCommands = [];
    currentSuite = '';
    const testCode = require(filepath);
    return currentCommands;
  },

  // Export DSL globally for test files
  describe,
  it,
  type,
  click,
  wait,
  assertText
};