import React, { Children } from 'react'
interface ContainerProps {
    children: React.ReactNode; // Use the appropriate type for children
}

function Container({ children }: ContainerProps): React.JSX.Element {
  return (
    <div className=' mx-5 md:mx-64'>
        {children}
    </div>
  )
}

export default Container