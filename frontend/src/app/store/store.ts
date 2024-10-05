import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface SearchState {
    searchValue: string;
}

const initialState: SearchState = { searchValue: '' };

// Create a slice of the state
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
});

// Export the action
export const { setSearchValue } = searchSlice.actions;

// Create the Redux store
const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
    },
});

// Export the store
export default store;

// Export types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
