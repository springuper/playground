# Appium iOS Hybrid App Demo

This demo shows how to test a hybrid iOS app (native + WebView) using Appium. The test demonstrates:
- Interacting with native iOS elements
- Switching between native and WebView contexts
- Finding and clicking elements in both contexts
- Waiting for elements to be available
- Handling test setup and teardown

## Prerequisites

1. macOS with Xcode installed
2. Node.js installed
3. iOS Simulator or real device
4. Appium Server
5. Your iOS app installed on the device/simulator

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Appium and drivers:
   ```bash
   npm install -g appium
   appium driver install xcuitest
   appium driver install ios
   ```

3. Update `config.js`:
   - Set correct iOS version in `platformVersion`
   - Set your device name in `deviceName`
   - Set your app's bundle ID in `bundleId`

## Running Tests

1. Start Appium server in one terminal:
   ```bash
   appium
   ```

2. Run the test in another terminal:
   ```bash
   npm test
   ```

## Test Flow

1. Launches the app
2. Waits for the home screen to load
3. Finds and clicks the second title in the collection view
4. Switches to WebView context
5. Verifies the title in the detail page
6. Switches back to native context
7. Closes the session

## Notes

- The test assumes a specific app structure with:
  - A home screen containing a collection view of titles
  - Detail pages shown in a WebView
  - A `.detail-title` element in the WebView (adjust selector as needed)
- XPath selectors are used for native elements and CSS selectors for WebView elements
- Appropriate waits are implemented to handle loading times
- Error handling and cleanup are included 