import React from 'react'
import Card from './Card'
import Image from 'next/image'
import box from "../assets/transblock.png"

function LatestBlock() {
  return (
    <div>
      <Card>
        <div>
          <div className='pt-2'>
            <h1 className='font-mono text-lg font-bold pb-2 ' >Latest Blocks</h1>
          </div>
          <hr className='text-black' />
          
          <div className="h-72 overflow-y-auto p-4 pr-5 border-2 border-black"> {/* Scrollable container */}
            {[...Array(10)].map((_, index) => ( // Sample data for demonstration
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className='grid grid-cols-2 gap-6 align-middle items-center '>
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Image
                        src={box}
                        alt="box"
                        height={40}
                        width={40}
                        className=" ml-[-15px]"
                      />
                      <div className="ml-">
                        <div className="flex flex-col sm:flex-row sm:items-center ">
                          <p className="text-lg font-semibold">6739728</p>
                          <p className="text-sm text-gray-600 sm:ml-2 ">27 secs ago</p>
                        </div>
                      </div>
                    </div>
                  <div className="">
                      <p className="text-lg font-medium p-1 bg-black text-center rounded-lg">0.02244 ETH</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>Fee Recipient: <span className="font-medium">0x6a7aA9b8...9f12F06a3</span></p>
                    <p className="text-gray-500">81 txns in 12 secs</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LatestBlock;
