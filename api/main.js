const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Variables
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/fields-data/:field', async (req, res) => {
  const response = await axios({
    method: 'GET',
    url: `https://api.thingspeak.com/channels/2279831/fields/${req.params.field}.json`
  });

  res.status(200).json(response.data.feeds);
});

app.listen(PORT);
