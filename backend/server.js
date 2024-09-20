const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Alchemy API URL
const API_URL = 'https://eth-sepolia.g.alchemy.com/v2/' + process.env.API_KEY;

// Endpoint to get the latest block number
app.get('/api/blockNumber', async (req, res) => {
  try {
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

// Endpoint to get block details by hash
app.get('/api/block/:hash', async (req, res) => {
  const blockHash = req.params.hash;

  // Validate the block hash format
  if (typeof blockHash !== 'string' || !/^0x[a-fA-F0-9]{64}$/.test(blockHash)) {
    return res.status(400).json({ error: 'Invalid block hash' });
  }

  try {
    const response = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBlockByHash',
      params: [blockHash, true]
    });

    if (response.data.error) {
      return res.status(400).json({ error: response.data.error.message });
    }

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching block details:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send('Request failed');
  }
});

// Endpoint to get balance by address
app.get('/api/balance/:address', async (req, res) => {
  const address = req.params.address;

  // Validate the address format
  if (typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }

  try {
    const response = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [address, 'latest'] // Use 'latest' for the most recent balance
    });

    if (response.data.error) {
      return res.status(400).json({ error: response.data.error.message });
    }

    // Convert the balance from wei to ether
    const balanceInWei = response.data.result;
    const balanceInEther = parseInt(balanceInWei, 16) / 1e18; // Convert wei to ether

    res.json({ address, balance: balanceInEther });
  } catch (error) {
    console.error('Error fetching balance:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send('Request failed');
  }
});

// Endpoint to get transaction history for an address
app.get('/api/transactions/:address', async (req, res) => {
  const address = req.params.address;

  // Validate the address format
  if (typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }

  try {
    // Get the latest block number
    const blockNumberResponse = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_blockNumber',
      params: []
    });
    const latestBlockNumber = parseInt(blockNumberResponse.data.result, 16);

    // Initialize an array to hold transactions
    const transactions = [];

    // Loop through the last 100 blocks
    for (let i = latestBlockNumber; i >= latestBlockNumber - 100; i--) {
      const blockResponse = await axios.post(API_URL, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBlockByNumber',
        params: [toHex(i), true] // true to get full transaction objects
      });

      if (blockResponse.data.result && blockResponse.data.result.transactions) {
        blockResponse.data.result.transactions.forEach(tx => {
          if (tx && tx.from && tx.to) { // Check if tx, tx.from, and tx.to are not null
            if (tx.from.toLowerCase() === address.toLowerCase() || tx.to.toLowerCase() === address.toLowerCase()) {
              transactions.push(tx);
            }
          }
        });
      }
    }

    res.json(transactions.length > 0 ? transactions : { message: 'No transactions found for this address.' });
  } catch (error) {
    console.error('Error fetching transaction history:', error.message);
    res.status(500).send('Request failed');
  }
});

// Helper function to convert number to hex
function toHex(number) {
  return '0x' + number.toString(16);
}


function toHex(number) {
  return '0x' + number.toString(16);
}


// Helper function to convert number to hex
function toHex(number) {
  return '0x' + number.toString(16);
}


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
