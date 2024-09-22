import React from 'react';

interface CardProps {
    children: React.ReactNode; // Specify that children can be any valid React node
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
<div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 pt-3 rounded-lg shadow-lg">
{children}
        </div>
    );
};

export default Card;
