import { configureStore } from '@reduxjs/toolkit'
import calendarSlice from '../reducers/calendarSlice'
import  modalSlice  from '../reducers/modalSlice'


export const store = configureStore({
    reducer: {
        modal: modalSlice,
        calendar: calendarSlice
    }
})
