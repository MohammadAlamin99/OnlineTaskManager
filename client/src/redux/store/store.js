import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../state-slice/user-slice';
import completeTaskSlice from '../state-slice/completeTask-slice';
import inProgressTaskSlice from '../state-slice/inProgressTask-slice';
import todoTaskSlice from '../state-slice/todoTask-slice';
import getUserDetailsSlice from '../state-slice/getUserDetails-slice';
import allTaskSlice from '../state-slice/allTask-slice';
import memberSlice from '../state-slice/member-slice';
import notificationSlice from '../state-slice/notification-slice';


const store = configureStore({
  reducer: {
    users: userSlice, getComplete: completeTaskSlice,
    getInProgress: inProgressTaskSlice, getTodo: todoTaskSlice, userGet: getUserDetailsSlice,
    getAllTask: allTaskSlice, getAllMember: memberSlice, getNotification: notificationSlice,
  }
})

export default store