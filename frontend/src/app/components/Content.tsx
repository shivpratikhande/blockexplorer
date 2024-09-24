"use client"; // Add this line

import React from 'react';
import Overview from './Overview';
import Container from './Container';
import { motion, useScroll, useTransform } from 'framer-motion';
import LatestBlock from './LatestBlock';
import LatestTrans from './LatestTrans';
import MoreInfo from './MoreInfo';



function Content() {

    /*  const { scrollY } = useScroll();
 
 
     //@ts-ignore
     const y = useTransform(scrollY, [0, 100], [20, 0]);
     //@ts-ignore
     const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  */
    return (
        <div>
            <Container>
                <div className=' flex flex-col gap-16'>
                    <motion.div
                        /* style={{ opacity, y }}
                        className="p-4" */
                        initial={{ opacity: 0, y: 20 }} // Initial state
                        animate={{ opacity: 1, y: 0 }}  // Animate to this state
                        transition={{ duration: 0.5, delay: 1 }} // Transition settings
                    >
                        <Overview />
                    </motion.div>
                    <motion.div
                        /* style={{ opacity, y }}
                        className="p-4" */
                        initial={{ opacity: 0, y: 20 }} // Initial state
                        animate={{ opacity: 1, y: 0 }}  // Animate to this state
                        transition={{ duration: 0.5, delay: 1 }} // Transition settings
                    >
                        <MoreInfo />
                    </motion.div>
                    <motion.div className=''
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}  // Animate to this state
                        transition={{ duration: 0.5, delay: 1.5 }}

                    >

                        <LatestBlock />
                    </motion.div>
                    <motion.div className=''
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}  // Animate to this state
                        transition={{ duration: 0.5, delay: 1.5 }}

                    >

                        <LatestTrans />
                    </motion.div>

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
