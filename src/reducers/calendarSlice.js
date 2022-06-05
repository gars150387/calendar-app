import { createSlice, nanoid } from "@reduxjs/toolkit"
import moment from "moment"

const initialState = [
    {
        id: nanoid(),
        title: 'Testing',
        start:moment().toDate(),
        end:moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'valor initial',
}
]

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        eventAddNew: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, start, end, notes) {
                return {
                    payload: {
                        title,
                        start,
                        end,
                        notes,
                    }
                }
            }
        },
        eventSelected(state){
                return state
            },
        activedEvent(state, action){
        }
    }
})

export const selectAllEvents = (state) => state.calendar

export const { eventAddNew, eventSelected, activedEvent } = calendarSlice.actions
export default calendarSlice.reducer
