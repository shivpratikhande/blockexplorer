import Image from 'next/image'
import React from 'react'
import Card from './Card'
import eth from "../assets/eth.png"


function MoreInfo() {
    return (
        <div>

            <div className=' mx-1 my-[-25px]'>
                <Card value={"bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 pt-3 rounded-lg shadow-lg"}>
                    <div className=' flex flex-col gap-5'>
                        <h1 className=' font-medium '>More Info</h1>
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

        </div>
    )
}

export default MoreInfo