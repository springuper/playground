export const config = {
    // Appium server configuration
    hostname: 'localhost',
    port: 4723,
    path: '/',  // Updated path for Appium 2.0

    // iOS capabilities
    capabilities: {
        platformName: 'iOS',
        'appium:platformVersion': '18.3',  // Updated to match simulator version
        'appium:deviceName': 'iPhone 16 Pro Max',    // Updated to available device
        'appium:automationName': 'XCUITest',
        'appium:bundleId': 'com.example.movieapp',  // Matches our app's bundle ID
        'appium:autoAcceptAlerts': true,
        'appium:autoWebview': false,  // Disable auto switching to let us control it
        'appium:fullReset': false,
        'appium:noReset': true,
        // Add SwiftUI specific settings
        'appium:usePrebuiltWDA': true,
        'appium:shouldTerminateApp': true,
        'appium:waitForQuiescence': false,  // Can help with SwiftUI animations
        // Add WebView specific capabilities
        'appium:webviewConnectTimeout': 30000,  // Increased timeout
        'appium:webviewConnectRetries': 3,      // Added retries
        'appium:enableWebviewDetailsCollection': true,
        'appium:includeDeviceCapsToSessionInfo': true,
        'appium:safariAllowPopups': true,
        'appium:showWebviewBorders': true,      // Added for debugging
        'appium:additionalWebviewBundleIds': ['com.example.movieapp'],
        'appium:startIWDP': true,               // Enable iOS Web Debugger Proxy
        // 'appium:customSSLCert': true,           // Enable custom SSL certificates
        'appium:webkitDebugProxyPort': 27753    // Specific port for webkit debug proxy
    }
}; 