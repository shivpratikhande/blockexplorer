const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Alchemy API URL
const API_URL = 'https://eth-sepolia.g.alchemy.com/v2/' + process.env.API_KEY;

//delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// Endpoint to get the latest block number
app.get('/api/balance/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const response = await axios.post(API_URL, {
      jsonrpc: "2.0",
      id: "1",
      method: 'eth_getBalance',
      params: [address, "latest"]
    });

    const amount = parseInt(response.data.result, 16);
    const etherAmount = amount / Math.pow(10, 18);
    return res.json({ address, "balance": etherAmount });

  } catch (error) {
    console.error('Error fetching balance:', error.message);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Endpoint to get transactions for an address
app.get('/api/balance/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const response = await axios.post(API_URL, {
      jsonrpc: "2.0",
      id: "1",
      method: 'eth_getBalance',
      params: [address, "latest"]
    });

    const amount = parseInt(response.data.result, 16);
    const etherAmount = amount / Math.pow(10, 18);
    return res.json({ address, "balance": etherAmount });
    
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Endpoint to get transactions for an address
app.get('/api/transactions/:address', async (req, res) => {
  const walletAddress = req.params.address;

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }

  try {
    // Get the latest block number
    const latestBlockResponse = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_blockNumber',
      params: []
    });

    const latestBlockNumber = parseInt(latestBlockResponse.data.result, 16);
    const blockPromises = [];
    const blockCount = 10; // Adjust the number of blocks to check

    // Create an array of block fetch promises for the last `blockCount` blocks
    for (let i = latestBlockNumber; i >= Math.max(latestBlockNumber - blockCount, 0); i--) {
      blockPromises.push(
        (async () => {
          try {
            return await axios.post(API_URL, {
              jsonrpc: '2.0',
              id: 1,
              method: 'eth_getBlockByNumber',
              params: [toHex(i), true]
            });
          } catch (error) {
            console.error(`Error fetching block ${i}:`, error.message); // Log individual block fetch errors
            return null; // Return null for failed fetches
          }
        })()
      );
    }

    // Fetch all blocks in parallel
    const blockResponses = await Promise.all(blockPromises);
    const transactions = [];

    // Process each block response
    blockResponses.forEach(blockResponse => {
      if (blockResponse && blockResponse.data && blockResponse.data.result) {
        const blockData = blockResponse.data.result;

        if (blockData.transactions) {
          blockData.transactions.forEach(tx => {
            if (tx && tx.from && tx.to) {
              const fromAddress = tx.from.toLowerCase();
              const toAddress = tx.to.toLowerCase();
              if (fromAddress === walletAddress.toLowerCase() || toAddress === walletAddress.toLowerCase()) {
                transactions.push({
                  hash: tx.hash,
                  blockNumber: tx.blockNumber,
                  from: fromAddress,
                  to: toAddress,
                  value: parseInt(tx.value, 16) / 1e18, // Convert Wei to Ether using hex
                  gas: tx.gas,
                  gasPrice: parseInt(tx.gasPrice, 16) / 1e18, // Convert Wei to Ether using hex
                  nonce: tx.nonce,
                  input: tx.input
                });
              }
            }
          });
        }
      }
    });

    // Send the response
    if (transactions.length > 0) {
      res.json(transactions);
    } else {
      res.json({ message: `No transactions found for address ${walletAddress}.` });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    if (error.response && error.response.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Endpoint to get transactions for an address
/* app.get('/api/transactions/:address', async (req, res) => {
  const walletAddress = req.params.address;

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }

  try {
    // Get the latest block number
    const latestBlockResponse = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_blockNumber',
      params: []
    });

    const latestBlockNumber = parseInt(latestBlockResponse.data.result, 16);
    const blockPromises = [];

    // Create an array of block fetch promises for the last 100 blocks
    for (let i = latestBlockNumber; i >= Math.max(latestBlockNumber - 100, 0); i--) {
      blockPromises.push(
        (async () => {
          await delay(200); // Adjust the delay as needed
          return axios.post(API_URL, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBlockByNumber',
            params: [toHex(i), true]
          }).catch(error => {
            console.error(`Error fetching block ${i}:`, error.message);
            return null; // Ignore errors for individual blocks
          });
        })()
      );
    }

    // Fetch all blocks in parallel
    const blockResponses = await Promise.all(blockPromises);
    const transactions = [];

    // Process each block response
    blockResponses.forEach(blockResponse => {
      if (blockResponse && blockResponse.data && blockResponse.data.result) {
        const blockData = blockResponse.data.result;

        if (blockData.transactions) {
          blockData.transactions.forEach(tx => {
            if (tx && tx.from && tx.to) {
              const fromAddress = tx.from.toLowerCase();
              const toAddress = tx.to.toLowerCase();
              if (fromAddress === walletAddress.toLowerCase() || toAddress === walletAddress.toLowerCase()) {
                transactions.push({
                  hash: tx.hash,
                  blockNumber: tx.blockNumber,
                  from: fromAddress,
                  to: toAddress,
                  value: parseInt(tx.value, 16) / 1e18, // Convert Wei to Ether using hex
                  gas: tx.gas,
                  gasPrice: parseInt(tx.gasPrice, 16) / 1e18, // Convert Wei to Ether using hex
                  nonce: tx.nonce,
                  input: tx.input
                });
              }
            }
          });
        }
      }
    });

    // Send the response
    if (transactions.length > 0) {
      res.json(transactions);
    } else {
      res.json({ message: `No transactions found for address ${walletAddress}.` });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    if (error.response && error.response.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});
 */
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



//transaction
/* app.get('/api/transactions/:address', async (req, res) => {
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
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 'latest',
        sort: 'desc',
        apikey: process.env.API_KEY,
      }
    });
    const latestBlockNumber = parseInt(blockNumberResponse.data.result, 16);

    // Initialize an array to hold transactions
    const transactions = [];

    // Loop through the last 100 blocks, ensuring we don't go below block 0
    for (let i = latestBlockNumber; i >= Math.max(latestBlockNumber - 4, 0); i--) {
      const blockResponse = await axios.post(API_URL, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBlockByNumber',
        params: [toHex(i), true] // true to get full transaction objects
      });

      if (blockResponse.data.result && blockResponse.data.result.transactions) {
        console.log(blockResponse.data.result)
        blockResponse.data.result.transactions.forEach(tx => {
          if (tx && tx.from && tx.to) {
            if (tx.from.toLowerCase() === address.toLowerCase() || tx.to.toLowerCase() === address.toLowerCase()) {
              transactions.push(tx);
            }
          }
        });
      }
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error.message);
    res.status(500).send('Request failed');
  }
}); */


// balance
app.get('/api/balance/:address', async(req, res)=>{
  const address = req.params.address
  try {
    const response = await axios.post(API_URL,{
      jsonrpc : "2.0",
      id: "1",
      method:'eth_getBalance',
      params:[address, "latest"]
    })

    const amount = parseInt(response.data.result, 16);
    console.log(amount)
    const etherAmount = amount / Math.pow(10, 18); 
    console.log(etherAmount)
    return res.json({ address, "balance": etherAmount})

    
  } catch (error) {
    
  }
})
app.get('/api/transactions/:address', async (req, res) => {
  const walletAddress = req.params.address;

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }

  try {
    // Get the latest block number
    const latestBlockResponse = await axios.post(API_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_blockNumber',
      params: []
    });

    const latestBlockNumber = parseInt(latestBlockResponse.data.result, 16);
    const blockPromises = [];

    // Create an array of block fetch promises for the last 100 blocks
    for (let i = latestBlockNumber; i >= Math.max(latestBlockNumber - 100, 0); i--) {
      blockPromises.push(
        axios.post(API_URL, {
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBlockByNumber',
          params: [toHex(i), true]
        }).catch(error => {
          console.error(`Error fetching block ${i}:`, error.message);
          return null; // Ignore errors for individual blocks
        })
      );
    }

    // Fetch all blocks in parallel
    const blockResponses = await Promise.all(blockPromises);
    const transactions = [];

    // Process each block response
    blockResponses.forEach(blockResponse => {
      if (blockResponse && blockResponse.data && blockResponse.data.result) {
        const blockData = blockResponse.data.result;

        if (blockData.transactions) {
          blockData.transactions.forEach(tx => {
            const fromAddress = tx.from.toLowerCase();
            const toAddress = tx.to.toLowerCase();
            if (fromAddress === walletAddress.toLowerCase() || toAddress === walletAddress.toLowerCase()) {
              transactions.push({
                hash: tx.hash,
                blockNumber: tx.blockNumber,
                from: fromAddress,
                to: toAddress,
                value: parseInt(tx.value, 16) / 1e18, // Convert Wei to Ether
                gas: tx.gas,
                gasPrice: parseInt(tx.gasPrice, 16) / 1e18, // Convert Wei to Ether
                nonce: tx.nonce,
                input: tx.input
              });
            }
          });
        }
      }
    });

    // Send the response
    if (transactions.length > 0) {
      res.json(transactions);
    } else {
      res.json({ message: `No transactions found for address ${walletAddress}.` });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Helper function to convert numbers to hex
function toHex(number) {
  return '0x' + number.toString(16);
}

app.get('/api/latest-blocks', async (req, res) => {
  try {
    const response = await axios.post(API_URL, {
      jsonrpc: "2.0",
      id: "1",
      method: 'eth_getBlockByNumber',
      params: ["latest", true] // true to return full transaction objects
    });

    const latestBlock = response.data.result;

    if (!latestBlock) {
      return res.status(404).json({ error: 'No blocks found' });
    }

    // Extracting block details and transactions
    const blockData = {
      number: parseInt(latestBlock.number, 16),
      hash: latestBlock.hash,
      transactions: latestBlock.transactions.map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: parseInt(tx.value, 16) / Math.pow(10, 18), // convert to Ether
        gas: parseInt(tx.gas, 16),
        gasPrice: parseInt(tx.gasPrice, 16) / Math.pow(10, 9) // convert to Gwei
      }))
    };

    return res.json(blockData);

  } catch (error) {
    console.error('Error fetching latest block:', error.message);
    res.status(500).json({ error: 'Failed to fetch latest block' });
  }
});



// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
