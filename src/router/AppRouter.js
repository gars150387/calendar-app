import React from 'react'
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
    Navigate,
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {

    const authStatus = 'authenticated' // 'not-ahtenticated'
    return (
        <BrowserRouter>
            <Routes>

            { (authStatus === 'not-ahtenticated') 
            ? <Route exact path="/auth/*" element={<LoginScreen />} /> 
            : <Route exact path="/*" element={<CalendarScreen />} />
        
        }
                
                

                <Route path='/*' element={ <Navigate to="/auth/login" />} />
            </Routes>
        </BrowserRouter>

    )
}
