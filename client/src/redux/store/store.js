import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../state-slice/user-slice';
import completeTaskSlice from '../state-slice/completeTask-slice';
import inProgressTaskSlice from '../state-slice/inProgressTask-slice';
import todoTaskSlice from '../state-slice/todoTask-slice';
import getUserDetailsSlice from '../state-slice/getUserDetails-slice';


const store = configureStore({
  reducer: {users:userSlice, getComplete:completeTaskSlice, 
    getInProgress:inProgressTaskSlice, getTodo : todoTaskSlice, userGet:getUserDetailsSlice }
})

export default store