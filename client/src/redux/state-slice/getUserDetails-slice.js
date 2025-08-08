import { createSlice } from "@reduxjs/toolkit";

export const getUserDetailsSlice = createSlice({
    name:'userDetails',
    initialState:{
        userDetails:[]
    },
    
    reducers:{
        setuserDetails:(state, action)=>{
            state.userDetails=action.payload;
        }
    }
})


export const {setuserDetails} = getUserDetailsSlice.actions;
export default getUserDetailsSlice.reducer;

