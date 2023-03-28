import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    selectedContinent: "Europe",
};


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        selectContinent: (state, action) => {
            state.selectedContinent = action.payload;
        }
    }
});


export const { selectContinent } = homeSlice.actions;

export default homeSlice.reducer;