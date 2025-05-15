import fetch from 'node-fetch';

export class WebDriverCommands {
    constructor(serverUrl = 'http://localhost:9515') {
        this.serverUrl = serverUrl;
        this.sessionId = null;
    }

    async sendCommand(method, endpoint, body = null) {
        const url = `${this.serverUrl}${endpoint}`;
        console.log(`\nSending ${method} request to: ${url}`);
        if (body) console.log('Request body:', JSON.stringify(body, null, 2));
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });
        
        const responseData = await response.json();
        console.log('Response:', JSON.stringify(responseData, null, 2));
        return responseData;
    }

    async startSession() {
        console.log('\nStarting new WebDriver session...');
        const response = await this.sendCommand('POST', '/session', {
            capabilities: {
                alwaysMatch: {
                    browserName: 'chrome',
                    'goog:loggingPrefs': {
                        browser: 'ALL'
                    }
                }
            }
        });
        this.sessionId = response.value.sessionId;
        console.log('Session created:', this.sessionId);
        return this.sessionId;
    }

    async navigateTo(url) {
        console.log('\nNavigating to:', url);
        return await this.sendCommand('POST', `/session/${this.sessionId}/url`, { url });
    }

    // @link https://www.w3.org/TR/webdriver2/#find-element
    async findElement(selector, using = 'css selector') {
        console.log('\nFinding element:', selector);
        const response = await this.sendCommand('POST', `/session/${this.sessionId}/element`, {
            using,
            value: selector
        });
        return response.value['element-6066-11e4-a52e-4f735466cecf'];
    }

    // @link https://www.w3.org/TR/webdriver2/#element-click
    async clickElement(elementId) {
        console.log('\nClicking element:', elementId);
        const result = await this.sendCommand('POST', `/session/${this.sessionId}/element/${elementId}/click`, {});
        return result;
    }

    async getElementText(elementId) {
        console.log('\nGetting text for element:', elementId);
        const response = await this.sendCommand('GET', `/session/${this.sessionId}/element/${elementId}/text`);
        return response.value;
    }

    async endSession() {
        if (this.sessionId) {
            console.log('\nEnding session:', this.sessionId);
            await this.sendCommand('DELETE', `/session/${this.sessionId}`);
            this.sessionId = null;
        }
    }
} 