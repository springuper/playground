# Selenium RC Demo

This project demonstrates web automation testing using Selenium RC (Remote Control) with modern JavaScript. It showcases how to automate web browser interactions and perform automated testing of web applications.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Chrome or Firefox browser installed
- Java Runtime Environment (JRE) for Selenium Server

## Setup

1. Install dependencies:
```bash
npm install
```


## Project Structure

```
selenium-rc-demo/
├── tests/              # Test files
├── config/             # Configuration files
├── utils/              # Helper utilities
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## Running Tests

Start the RC server first:
```bash
npm run start
```

Open the test page in your browser, and then run `fetch('/run')` in the console.