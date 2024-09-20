const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

/* const API_KEY = 'OSjMG2EInzcBHj6EYL2CYeuLiQJvzzAk'; // Use your actual API key here
 */const API_URL = 'https://eth-mainnet.g.alchemy.com/v2/' + process.env.API_KEY;

app.get('/api/blockNumber', async (req, res) => {
  try {  try {  try {                 


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
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Alchemy:', error.message);
    res.status(error.response ? error.response.status : 500).send('Request failed');
  }
});
app.get('/api/transaction/:hash', async (req, res) => {
  const txHash = req.params.hash;
  try {
    const response = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getTransactionByHash',
      params: [txHash]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log the response for debugging
    console.log("Response data:", response.data);

    // Check for errors in the response
    if (response.data.error) {
      return res.status(400).json({ error: response.data.error.message });
    }

    res.json(response.data.result); // Return only the result
    console.log("Working");
    
  } catch (error) {
    console.error('Error fetching transaction details:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send('Request failed');
  }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
