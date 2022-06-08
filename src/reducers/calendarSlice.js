import { createSlice, nanoid } from "@reduxjs/toolkit"
import moment from "moment"

const initialState = [

    {
                id: nanoid(),
                title: 'Testing',
                start:moment().startOf().toDate(),
                end:moment().add(2, 'hours').toDate(),
                bgcolor: '#fafafa',
                notes: 'valor initial',
        },
        {
            id: nanoid(),
            title: 'Another Testing',
            start:moment().toDate(),
            end:moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'valor initial',
        }


//     events: [{
//         id: nanoid(),
//         title: 'Testing',
//         start:moment().toDate(),
//         end:moment().add(2, 'hours').toDate(),
//         bgcolor: '#fafafa',
//         notes: 'valor initial',
// },
// {
//     id: nanoid(),
//     title: 'Another Testing',
//     start:moment().toDate(),
//     end:moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'valor initial',
// }]
]

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        eventAddNew: {
            reducer(state, action) {
                state.push(action.payload.events)
            },
            prepare(id, title, start, end, notes, user) {
                return {
                    payload: {
                        id,
                        title,
                        start,
                        end,
                        notes,
                        user,
                    }
                }
            }
        },
        eventSelected: (state) =>{
                return state
            },
    }
})

export const { allEvents } =( state ) =>(state.calender)

export const { eventAddNew, eventSelected, activedEvent } = calendarSlice.actions
export default calendarSlice.reducer
