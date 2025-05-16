import path from 'path';
import { fileURLToPath } from 'url';
import { WebDriverCommands } from './webdriver-commands.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let driver;

// Setup and teardown helpers
async function beforeAll() {
    driver = new WebDriverCommands();
    await driver.startSession();
    
    const testPagePath = `file://${path.join(__dirname, 'test.html')}`;
    console.log('Navigating to test page:', testPagePath);
    await driver.navigateTo(testPagePath);
}

async function afterAll() {
    // await driver.endSession();
}

// Test case
async function testButtonClickChangesText() {
    console.log('\nTest: Button click changes header text');
    console.log('----------------------------------------');
    
    // Click the button
    console.log('1. Finding and clicking the button...');
    const buttonId = await driver.findElement('#changeText');
    console.log('buttonId', buttonId);
    await driver.clickElement(buttonId);

    // Verify the text changed
    console.log('2. Verifying text changed...');
    const headerId = await driver.findElement('#header');
    console.log('headerId', headerId);
    const headerText = await driver.getElementText(headerId);
    
    // Assert
    const expectedText = 'Text Changed!';
    console.log(`Expected: "${expectedText}"`);
    console.log(`Actual: "${headerText}"`);
    
    if (headerText === expectedText) {
        console.log('✅ PASS: Text changed as expected');
        return true;
    } else {
        console.log('❌ FAIL: Text did not change as expected');
        return false;
    }
}

// Main test runner
async function runTests() {
    try {
        await beforeAll();
        const passed = await testButtonClickChangesText();
        console.log('\nTest Summary');
        console.log('------------');
        console.log(passed ? '✅ All tests passed!' : '❌ Tests failed!');
    } catch (error) {
        console.error('\n❌ Tests failed with error:', error);
    } finally {
        await afterAll();
    }
}

// Run the tests
runTests(); 