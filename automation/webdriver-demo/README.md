# WebDriver Demo

This project demonstrates modern web automation testing using WebDriver with JavaScript/Node.js. It showcases the latest WebDriver protocol features and best practices for web application testing.

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- Chrome, Firefox, or Edge browser
- WebDriver-compatible browser drivers:
  - ChromeDriver for Chrome
  - GeckoDriver for Firefox
  - EdgeDriver for Edge

## Setup

1. Install project dependencies:
```bash
npm install
```

2. Install browser drivers (automatically managed by WebdriverIO):
```bash
npx wdio config
```

## Project Structure

```
webdriver-demo/
├── tests/                 # Test files
│   ├── e2e/              # End-to-end tests
│   ├── integration/      # Integration tests
│   └── specs/            # Test specifications
├── pages/                # Page Object Models
├── config/               # WebDriver configurations
├── data/                 # Test data
├── reports/              # Test reports
└── package.json         # Project dependencies
```

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test suite:
```bash
npm test -- --suite e2e
```

Run tests in specific browser:
```bash
npm test -- --browser chrome
```

## Features

- Modern WebDriver Protocol implementation
- Page Object Model pattern
- Parallel test execution
- Cross-browser testing
- Automatic wait strategies
- Screenshot capture on failure
- HTML test reports
- CI/CD integration

## Test Examples

The project includes examples for:

- Modern web app interactions
- Dynamic content handling
- Shadow DOM testing
- Iframe handling
- API integration tests
- Visual regression tests
- Performance metrics collection

## Configuration

WebDriver configuration (`wdio.conf.js`):

```javascript
exports.config = {
    specs: ['./tests/**/*.js'],
    maxInstances: 3,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    baseUrl: 'http://localhost:3000',
    framework: 'mocha',
    reporters: ['spec', 'allure'],
    mochaOpts: {
        timeout: 60000
    }
}
```

## Best Practices

1. Use async/await for better readability
2. Implement custom commands for common actions
3. Use data-testid attributes for stable selectors
4. Implement retry mechanisms for flaky tests
5. Follow AAA (Arrange-Act-Assert) pattern
6. Use environment variables for sensitive data

## Debugging

Debug your tests:

1. Use `browser.debug()` to pause execution
2. Enable headless mode for CI environments
3. Use WebDriver DevTools Protocol
4. Enable verbose logging
5. Use browser's developer tools

## Common Issues & Solutions

- **Element not interactable**: 
  - Wait for element to be clickable
  - Scroll element into view
  - Check element visibility

- **Stale element reference**: 
  - Implement retry mechanism
  - Re-fetch element before interaction
  - Use waitUntil conditions

- **Timing issues**:
  - Use explicit waits
  - Avoid fixed timeouts
  - Implement smart waiting strategies

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

## Reporting

- Allure Reports integration
- Screenshot capture on failure
- Video recording of test runs
- Performance metrics collection
- Test execution timeline
- Detailed error logging

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details.

## Resources

- [WebDriver Protocol Specification](https://w3c.github.io/webdriver/)
- [WebdriverIO Documentation](https://webdriver.io/)
- [Selenium Documentation](https://www.selenium.dev/documentation/) 