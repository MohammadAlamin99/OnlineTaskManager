import { createSlice } from "@reduxjs/toolkit";

export const todoTaskSlice = createSlice({
    name:'todo',
    initialState:{
        todo:[],
    },
    reducers:{
        setTodo:(state, action)=>{
            state.todo = action.payload;
        }
    }

});


export const {setTodo} = todoTaskSlice.actions;
export default todoTaskSlice.reducer;