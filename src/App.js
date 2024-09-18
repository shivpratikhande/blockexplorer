// App.js
import { useEffect, useState } from 'react';

function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBlockNumber() {
      try {
        const response = await fetch('http://localhost:3001/api/blockNumber');
        const data = await response.json();
        setBlockNumber(data.result); // Adjust based on actual response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching block number:', error);
        setLoading(false);
      }
    }

    getBlockNumber();
  }, []);



const hex = blockNumber;
const decimal = parseInt(hex, 16);


  return (
    <div className="App">
      {loading ? 'Loading...' : `Block Number: ${decimal}`}
    </div>
  );
}

export default App;
