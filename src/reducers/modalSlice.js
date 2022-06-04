import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    modalOpen: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openModal: (state) =>{
            state.isOpen = true
        }
    }
})

export const { openModal } = modalSlice.actions

export default modalSlice.reducer