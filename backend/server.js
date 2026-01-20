const express = require('express');
const app = express();


app.get('/health', (req, res) => {
  res.send('/health fine')
});

const server = app.listen(4000, async () => {
  console.log('Server listening on http://localhost:4000');
});

server;