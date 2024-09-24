"use client"
import React, { useEffect, useState } from 'react';
import Search from './Search';
import Container from './Container';

// React
import { motion } from "framer-motion";

const TypingEffect = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;

        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index += 1;

            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return (
        <motion.h1
            className='text-[#10B981] font-bold py-3 text-xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, }}
        >
            {displayedText}
        </motion.h1>
    );
};

function Middle() {

    return (
        <div className='bg-black w-full h-52 py-5 align-middle text-center font-mono '>
            <Container>
                <TypingEffect text="  The Sepolia Blockchain Explorer" speed={100}  />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5}}
                >
                    <Search />
                </motion.div>
            </Container>
           
        </div>
    );
}

export default Middle;
