const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Alchemy API key and URL
const API_KEY = 'OSjMG2EInzcBHj6EYL2CYeuLiQJvzzAk'; // Use your actual API key here
const API_URL = 'https://eth-mainnet.g.alchemy.com/v2/' + API_KEY;

app.get('/api/blockNumber', async (req, res) => {
  try {
    // Making a POST request to the Alchemy API
    const response = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_blockNumber',
      params: []
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Send the response data as JSON
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Alchemy:', error.message);
    res.status(error.response ? error.response.status : 500).send('Request failed');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
