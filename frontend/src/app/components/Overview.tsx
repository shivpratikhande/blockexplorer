"use client"
import React, { useEffect, useState } from 'react'
import Card from "./Card"
import Image from 'next/image'
import eth from "../assets/eth.png"
import axios from "axios"
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styleText } from 'util'
import { motion, useScroll, useTransform } from 'framer-motion';

interface BalanceData {
    balance: string;
    address: string
}

const Overview: React.FC = () => {

    const searchValue = useSelector((state: RootState) => state.search.searchValue); // Accessing the search value


    const [data, setData] = useState<BalanceData | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("in")

        const fetchData = async () => {
            if (!searchValue) return

            try {
                console.log("valuein " + searchValue)
                console.log("hited")
                const response = await axios.get(`http://localhost:3001/api/balance/${searchValue}`);
                setData(response.data);
                console.log(response)
            } catch (error) {
                setError(error as any);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchValue]);

    const truncateAddress = (address?: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleCopy = () => {
        if (data && data.address) {
            navigator.clipboard.writeText(data.address);

        }
    };

    if (loading) return


    //0xe890D42AFd5EA1a8506F117A8c352937A164BaaA
    return (
        <motion.div
            /* style={{ opacity, y }}
            className="p-4" */
            initial={{ opacity: 0, y: 20 }} // Initial state
            animate={{ opacity: 1, y: 0 }}  // Animate to this state
            transition={{ duration: 0.5, delay: 1 }} // Transition settings
        >
            <div className=' mx-1 my-[-25px]'>
                <Card value={"bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 pt-3 rounded-lg shadow-lg"}>
                    <div className=' flex flex-col gap-5'>
                        <div className=' flex justify-between'>
                            <h1 className=' font-medium '>Overview</h1>
                            <div className=' flex gap-2'>
                                <h1 className='font-medium'>{truncateAddress(data?.address)}</h1>
                                <button onClick={handleCopy} className=' font-bold hover:bg-black hover:rounded-sm' >
                                    <ContentCopyIcon className=" text-xl font-bold" />
                                </button>
                            </div>

                        </div>
                        <div className=' '>
                            <p className=' text-black font-mono text-sm mb-[-8px]'>SEPOLIA ETH BALANCE</p>
                            <div className=' flex items-center align-middle ml-[-17px]'>
                                <Image
                                    src={eth}
                                    alt='eth'
                                    height={50}
                                    className=''
                                />
                                <p className='font-semibold'>{data ? `${data.balance} ETH` : 'Loading...'}</p>

                            </div>


                        </div>
                    </div>
                </Card>
            </div>
        </motion.div>

    )
}

export default Overview