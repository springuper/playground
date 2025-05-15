# WebDriver Protocol Demo

This is a simple demonstration of using the WebDriver protocol directly without any WebDriver client library. It shows how to interact with a Chrome browser using raw WebDriver protocol commands.

## Prerequisites

1. Node.js installed on your system
2. Chrome browser installed

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

## Running the Demo

You can run the tests in two ways:

### Option 1: All-in-one command
```bash
npm run test-with-server
```
This will start ChromeDriver and run the tests automatically.

### Option 2: Separate terminals
1. Start ChromeDriver in one terminal:
   ```bash
   npm run start-server
   ```

2. Run the tests in another terminal:
   ```bash
   npm test
   ```

## What the Demo Does

1. Creates a new WebDriver session with Chrome
2. Opens a test HTML page
3. Finds and clicks a button
4. Verifies that clicking the button changed some text on the page
5. Closes the session

The demo uses raw WebDriver protocol commands sent as HTTP requests to demonstrate how WebDriver works at the protocol level. 