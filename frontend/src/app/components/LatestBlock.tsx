"use client"
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Image from 'next/image';
import box from "../assets/transblock.png";
import axios from 'axios';

function LatestBlock() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'YOUR_ALCHEMY_API_URL'; // Replace with your actual API URL

  useEffect(() => {
    const fetchLatestBlocks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/latest-blocks`); // Adjust the endpoint as needed
        setBlocks(response.data.transactions); // Assuming transactions array is what you want to display
      } catch (error) {
        console.error('Error fetching latest blocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlocks();
  }, [API_URL]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state
  }

  return (
    <div>
      <Card value={" bg-transparent my-3  p-2 mx-[-5px] rounded-lg  "}>
        <div> 
          <div className='pt-2 '>
            <h1 className='font-mono text-lg font-bold pb-2 text-white'>Latest Blocks</h1>
          </div>
          <hr className='text-black' />
          
          <div className="h-72 overflow-y-auto p-3 pr-5 "> {/* Scrollable container */}
            {blocks.length === 0 ? (
              <p className="text-white">No blocks found.</p>
            ) : (
              blocks.map((block, index) => (
                <div key={index} className='bg-zinc-400 my-3 p-2 mx-[-5px] bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 pt-3 rounded-lg shadow-lg'>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className='grid grid-cols-2 gap-6 align-middle items-center '>
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Image
                          src={box}
                          alt="box"
                          height={50}
                          width={50}
                          className="ml-[-15px]"
                        />
                        <div className="ml-">
                          <div className="flex flex-col sm:flex-row sm:items-center ">
                            <p className="text-lg font-semibold">{block.hash}</p>
                            <p className="text-sm text-gray-600 sm:ml-2 ">27 secs ago</p> {/* You can replace this with actual timestamp */}
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-lg font-medium p-1 bg-black text-center rounded-lg">{block.value} ETH</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p>Fee Recipient: <span className="font-medium">{block.to}</span></p>
                      <p className="text-gray-500">81 txns in 12 secs</p> {/* Replace this with actual transaction count */}
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LatestBlock;
