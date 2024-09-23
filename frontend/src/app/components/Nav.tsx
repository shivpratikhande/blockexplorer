"use client"
import React, { useState, useRef, useEffect } from 'react';
import Container from './Container';
import logo3 from "../assets/logo3.png";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import WalletConnect from './WalletConnect';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); // Type the ref

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Assert that event.target is a Node
            const target = event.target as Node;

            if (menuRef.current && !menuRef.current.contains(target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='sticky top-0 z-50'>
            <div className='text-white bg-black font-bold sticky top-0 z-50'>
                <Container>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-[-5px]'>
                            <div className="w-[70px] h-[70px]  animate-rotate">
                                <Image
                                    src={logo3}
                                    alt='logo'
                                />
                            </div>
                            <h1 className='font-bold text-xl' style={{ textShadow: '2px 2px 4px rgba(16, 185, 129, 0.7)' }}>
                                BlockExplrr
                            </h1>
{/*                             <WalletConnect />
 */}
                        </div>

                        <div className='md:hidden'>
                            <Button onClick={toggleMenu} className='shadow-lg shadow-[#10B981]'>
                                {isOpen ? "" : <DehazeIcon />}
                            </Button>
                        </div>

                        {isOpen && (
                            <div ref={menuRef} className="absolute right-0 mt-36 md:hidden bg-[#0a0a0a] p-4 transition-all duration-300 ease-in-out rounded-lg z-20">
                                <div className="md:hidden bg-[#0a0a0a] p-4 transition-all duration-300 ease-in-out rounded-lg mt-[-10px]">
                                    <ul className="flex flex-col gap-4">
                                        <div className='flex items-center justify-between'>
                                            <li className="text-white hover:text-[#FFD700] cursor-pointer">Shop</li>
                                            <button onClick={closeMenu} className='bg-black'>
                                                <CloseIcon className="text-white" />
                                            </button>
                                        </div>
                                        <li className="text-white hover:text-[#FFD700] cursor-pointer" onClick={closeMenu}>On Scale</li>
                                        <li className="text-white hover:text-[#FFD700] cursor-pointer" onClick={closeMenu}>New Arrivals</li>
                                        <li className="text-white hover:text-[#FFD700] cursor-pointer" onClick={closeMenu}>Brands</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Nav;
