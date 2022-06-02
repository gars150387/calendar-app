import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: {
            reducer(state, action) {
                return {
                    payload: true
                }
            }
        }
    }
})

export const { openModal } = modalSlice.actions;

export default modalSlice.reducer