// server.js
const express = require('express');
const client = require('./db/client');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.listen(5173, () => {
  console.log('Running on http://localhost:5173');
});