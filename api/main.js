const express = require('express');
const app = express();

// Variables
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Api is working!');
});

app.listen(PORT);
