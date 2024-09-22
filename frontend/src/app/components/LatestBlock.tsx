import React from 'react'
import Card from './Card'
import Image from 'next/image'
import box from "../assets/transblock.png"

function LatestBlock() {
  return (
    <div>
      <Card>
        <div>
          <div className=' pt-2'>
            <h1 className=' font-mono text-lg '>Latest Blocks</h1>
          </div>
          <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Image
                  src={box}
                  alt="box"
                  height={40}
                  width={40}
                  className="sm:hidden"
                />
                <div className="ml-2">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="text-lg font-semibold">6739728</p>
                    <p className="text-sm text-gray-500 sm:ml-2">27 secs ago</p>
                  </div>
                </div>
              </div>

              <div className="text-sm">
                <p>Fee Recipient: <span className="font-medium">0x6a7aA9b8...9f12F06a3</span></p>
                <p className="text-gray-500">81 txns in 12 secs</p>
              </div>
            </div>

            <div className="border border-zinc-500 p-2 mt-2 rounded-md">
              <p className="text-lg font-medium">0.02244 Eth</p>
            </div>
          </div>

        </div>
      </Card>
    </div>
  )
}

export default LatestBlock