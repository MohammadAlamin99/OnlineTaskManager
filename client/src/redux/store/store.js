import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../state-slice/user-slice';
import completeTaskSlice from '../state-slice/completeTask-slice';
import inProgressTaskSlice from '../state-slice/inProgressTask-slice';
import todoTaskSlice from '../state-slice/todoTask-slice';


const store = configureStore({
  reducer: {users:userSlice, getComplete:completeTaskSlice, 
    getInProgress:inProgressTaskSlice, getTodo : todoTaskSlice }
})

export default store