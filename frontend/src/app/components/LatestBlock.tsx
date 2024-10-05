"use client";
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Image from 'next/image';
import box from "../assets/transblock.png";
import axios from 'axios';

// Define an interface for the block data
interface Block {
  hash: string;
  value: string;
  to: string;
  gas:string
  gasValue:string

  // Add other properties you expect in the block if needed
}

function LatestBlock() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = 'http://localhost:3001/api/latest-blocks'; // Your API URL

  useEffect(() => {
    const fetchLatestBlocks = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlocks(response.data.transactions); // Assuming transactions array is what you want to display
      } catch (error) {
        console.error('Error fetching latest blocks:', error);
        setError('Failed to load blocks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlocks();
  }, [API_URL]);

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading state
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
  }

  return (
    <div>
      <Card value={" bg-transparent my-3  p-2 mx-[-5px] rounded-lg  "}>
        <div>
          <div className='pt-2'>
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
                            <p className="text-lg font-semibold">{truncateAddress(block.hash)}</p>
                            <p className="text-sm text-gray-600 sm:ml-2 ">gas value: {block.gas}</p> {/* You can replace this with actual timestamp */}
                          </div>
                        </div>
                      </div>
                      <div className=" mx-7">
                        <p className="text-lg font-medium p-1  bg-black text-center rounded-lg">{block.value} ETH</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p>Fee Recipient: <span className="font-medium">{truncateAddress(block.to)}</span></p>
                      <p className="text-gray-500">gas price: {block.gasValue}</p> {/* Replace this with actual transaction count */}
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
