import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchValue } from '../store/store'; // Import your action creator

function Search() {
    const dispatch = useDispatch();
    const searchValue = useSelector((state: RootState) => state.search.searchValue);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value)); // Using action creator
        console.log("Current Search Value:", event.target.value); // Log the current input value
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (searchValue) {
            dispatch({ type: 'SUBMIT_SEARCH' }); // You might consider using an action creator for this too
            console.log("Searching for:", searchValue); // Log the search action
        } else {
            console.log("Please enter a value to search."); // Feedback for empty input
        }
    };

    return (
        <div className='text-center'>
            <div className='bg-white flex justify-between px-5 items-center mx-12 rounded-lg shadow-md py-2'>
                <input 
                    type="text" 
                    className='focus:outline-none py-1 px-2 font-semibold text-base w-[300px]'
                    placeholder='Search by address'
                    value={searchValue} // Bind the input to the searchValue state
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                    <SearchIcon className='text-base' />
                </div>
            </div>
        </div>
    );
}

export default Search;
