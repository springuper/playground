const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let commandQueue = [];

app.use(express.static('public'));
app.use(express.json());

app.get('/command', (req, res) => {
  const batch = [...commandQueue];
  commandQueue = [];
  res.json({ commands: batch });
});

app.post('/report', (req, res) => {
  console.log('[REPORT]', req.body);
  res.sendStatus(200);
});

// Load DSL script and convert to command queue
app.get('/run', async (req, res) => {
  const { runTestFile } = require('./dsl-runtime');
  const testPath = path.resolve(__dirname, 'tests', 'example.test.js');
  delete require.cache[require.resolve(testPath)]; // clear require cache
  const commands = runTestFile(testPath);
  commandQueue.push(...commands);
  res.send('Mocha-style test loaded and queued.');
});

app.listen(3000, () => {
  console.log('RC simulation server running at http://localhost:3000');
});