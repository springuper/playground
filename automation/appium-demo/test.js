import { remote } from 'webdriverio';
import { config } from './config.js';
import assert from 'assert';

async function runTest() {
    console.log('Connecting to Appium server...');
    const driver = await remote(config);

    try {
        // Wait for app to be ready
        console.log('Waiting for app to initialize...');
        await driver.pause(2000);

        // Find and click the movie cell
        console.log('Finding and clicking movie cell...');
        const movieCell = await driver.$('~movie-link-1');
        await movieCell.waitForExist({ timeout: 10000 });
        await movieCell.click();

        // Wait for WebView to be present in native context
        // console.log('Waiting for WebView to appear...');
        // const webview = await driver.$('~movie-detail-webview-content');
        // await webview.waitForExist({ timeout: 10000 });
        
        // Get available contexts and log them
        console.log('Getting available contexts...');
        await driver.pause(2000); // Give WebView time to initialize
        let contexts = await driver.getContexts();
        console.log('Available contexts:', contexts);

        // Wait and retry getting contexts if needed
        let retries = 3;
        while (retries > 0 && !contexts.find(c => c.includes('WEBVIEW'))) {
            console.log(`Retrying context detection (${retries} attempts left)...`);
            await driver.pause(2000);
            contexts = await driver.getContexts();
            console.log('Updated contexts:', contexts);
            retries--;
        }

        // Switch to WebView context if available
        const webviewContext = contexts.find(c => c.includes('WEBVIEW'));
        if (webviewContext) {
            console.log('Switching to WebView context:', webviewContext);
            await driver.switchContext(webviewContext);
            
            // Verify we can interact with WebView content
            console.log('Verifying movie details in WebView...');
            
            // Wait for and verify title
            const titleElement = await driver.$('#title');
            await titleElement.waitForExist({ timeout: 5000 });
            const title = await titleElement.getText();
            console.log('Movie title:', title);
            
            // Wait for and verify description
            const descriptionElement = await driver.$('#description');
            await descriptionElement.waitForExist({ timeout: 5000 });
            const description = await descriptionElement.getText();
            console.log('Movie description:', description);
            
            // Verify it's the correct movie (Inception)
            assert.equal(title, 'Inception');
            assert.equal(description, 'A thief who steals corporate secrets through dream-sharing technology.');
            
            console.log('✅ Successfully verified movie details in WebView');
        } else {
            throw new Error('WebView context not found in available contexts');
        }

    } catch (error) {
        console.error('Test failed:', error);
        throw error;
    } finally {
        await driver.deleteSession();
    }
}

runTest().catch(console.error); 