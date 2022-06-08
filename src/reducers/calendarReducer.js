import moment from 'moment'
import { types } from "../type/types";
import { nanoid } from "@reduxjs/toolkit";


const initialState = {
    events: [{
        id: nanoid(),
        title: 'Testing',
        start: moment().startOf().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'valor initial',
    }],
    activeEvent: null
}


export const calendarReducer = (state = initialState, action) => {

    switch (action.types) {

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        default:
            return state;
    }

}