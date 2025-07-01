import { createSlice } from '@reduxjs/toolkit';

export const allTaskSlice = createSlice({
    name: 'alltask',
    initialState: {
        alltask: [],
    },
    reducers: {
        setAlltask: (state, action) => {
            state.alltask = action.payload;
        }
    }

})
export const { setAlltask } = allTaskSlice.actions;
export default allTaskSlice.reducer;
