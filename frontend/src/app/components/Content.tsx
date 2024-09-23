"use client"; // Add this line

import React from 'react';
import Overview from './Overview';
import Container from './Container';
import { motion } from 'framer-motion';
import LatestBlock from './LatestBlock';

function Content() {
    return (
        <div>
            <Container>
                <div className=' flex flex-col gap-16'>
                    <motion.div className='  '
                        initial={{ opacity: 0, y: 20 }} // Initial state
                        animate={{ opacity: 1, y: 0 }}  // Animate to this state
                        transition={{ duration: 0.5, delay: 2 }} // Transition settings
                    >
                        <Overview />
                    </motion.div>
                    <LatestBlock />

                </div>

                <div className="grid grid-cols-2 gap-6 ..."> 
                    <div className="col-span-1 p-5 bg-funkyGreen rounded-lg shadow-lg ...">
                        asdasdasd
                    </div>
                    <div className="col-span-1 p-5 bg-funkyBlue rounded-lg shadow-lg ...">
                        asdasdasd
                    </div>
                </div>


            </Container>
        </div>
    );
}

export default Content;
