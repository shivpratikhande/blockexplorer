import React from 'react';

interface CardProps {
    children: React.ReactNode; // Specify that children can be any valid React node
    value: any
}

const Card: React.FC<CardProps> = ({ children, value }) => {
    return (
        <div className={value}>
            {children}
        </div>
    );
};

export default Card;
