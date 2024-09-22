"use client"
import React, { useEffect, useState } from 'react';
import Search from './Search';
import Container from './Container';

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

  return <h1 className='text-[#10B981] font-bold py-3'>{displayedText}</h1>;
};

function Middle() {
    return (
        <div className='bg-black w-full h-52 py-5 align-middle text-center font-mono'>
            <Container>
                <TypingEffect text="  The Sepolia Block Chain Explorer" speed={100} />
                <Search />
            </Container>
        </div>
    );
}

export default Middle;
