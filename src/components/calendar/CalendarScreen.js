import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { messages } from '../helper/calendar-messages-es'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendarScreen.css'
import 'moment/locale/es'  // this is the config to change the language in moment



moment.locale('es')

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar)


    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')

    const doubleCLick = (e) => {
        dispatch(uiOpenModal())
        dispatch(eventSetActive(e))
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) => {
        setlastView(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = ( events, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className='calendar-screen'>
            <Navbar />


            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                notes="notes"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={doubleCLick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />


            <AddNewFab />
            <CalendarModal />
        </div>
    )
}
