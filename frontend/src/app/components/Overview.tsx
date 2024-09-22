import React from 'react'
import Card from "./Card"
import Image from 'next/image'
import eth from "../assets/eth.png"

function Overview() {
    return (
        <div className=' mx-1 my-[-25px]'>
            <Card>
                <div className=' flex flex-col gap-5'>
                    <h1 className=' font-medium '>Overview</h1>
                    <div className=' '>
                        <p className=' text-black font-mono text-sm mb-[-8px]'>ETH BALANCE</p>
                        <div className=' flex items-center align-middle ml-[-17px]'>
                            <Image
                                src={eth}
                                alt='eth'
                                height={50}
                                className=''
                            />
                            <p className=' font-semibold'>0.3256494961198 ETH</p>

                        </div>


                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Overview