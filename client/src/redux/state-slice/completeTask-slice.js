import { createSlice } from '@reduxjs/toolkit';

export const completeTaskSlice = createSlice({
    name: 'complete',
    initialState: {
        complete: [],
    },
    reducers: {
        setComplete: (state, action) => {
            state.complete = action.payload;
        }
    }

})
export const { setComplete } = completeTaskSlice.actions;
export default completeTaskSlice.reducer;