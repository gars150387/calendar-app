import { createSlice } from "@reduxjs/toolkit"
import moment from "moment"

const initialState = {
    event: [{
        title: 'cumpleanos de mi mama',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'comprar el pastel'

    }],
        activeEvent: null
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        calendar(state){
            return {
                ...state
            }
        }
    }
})

export default calendarSlice.reducer
export const {calendar} = calendarSlice.actions