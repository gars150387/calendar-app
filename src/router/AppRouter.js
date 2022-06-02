import React from 'react'
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<CalendarScreen />} />
                <Route exact path="/login" element={<LoginScreen />} />
            </Routes>
        </BrowserRouter>

    )
}
