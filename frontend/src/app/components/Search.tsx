import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    return (
        <div className=' text-center  '>
            <div className=' bg-white  flex justify-between px-5 items-center mx-12 rounded-lg'>
                <input type="text" className=' focus:outline-none py-1 font-semibold' placeholder='Search by address' />
                <div>
                    <SearchIcon className=' ' />
                </div>
            </div>
        </div>
    )
}

export default Search