import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../reducers/modalSlice";

export const store = configureStore({
    reducer: {
        modal: modalSlice
    }
})