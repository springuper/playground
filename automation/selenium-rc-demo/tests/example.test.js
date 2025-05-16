const { describe, it, type, click, wait, assertText } = require('../dsl-runtime');

describe('Input interaction test', () => {
  it('should update header when button is clicked', () => {
    const input = 'Tubi';
    type('input', input);
    click('btn');
    wait(1000);
    assertText('header', `Input: ${input}`);
  });
});