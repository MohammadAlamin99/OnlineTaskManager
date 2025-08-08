import { createSlice } from "@reduxjs/toolkit";

export const inProgressTaskSlice = createSlice({

    name:'inProgress',
    initialState:{
        inProgress : [],
    },
     reducers:{
        setInProgress:(state, action)=>{
            state.inProgress= action.payload;
        }
     }
});


export const {setInProgress} = inProgressTaskSlice.actions;
export default inProgressTaskSlice.reducer;