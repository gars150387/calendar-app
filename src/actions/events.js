import { types } from "../type/types"



export const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
})