import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { messages } from '../helper/calendar-messages-es'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendarScreen.css'
import 'moment/locale/es'  // this is the config to change the language in moment



moment.locale('es')

const localizer = momentLocalizer(moment);



export const CalendarScreen = () => {

    const { events } = useSelector(state => state.calendar)

    // const events = [{
    //                 id: nanoid(),
    //                 title: 'Testing',
    //                 start:moment().startOf().toDate(),
    //                 end:moment().add(2, 'hours').toDate(),
    //                 bgcolor: '#fafafa',
    //                 notes: 'valor initial',
    //         }]

    const distpach = useDispatch();


    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')


    const doubleCLick = (e) => {
        distpach(uiOpenModal())
        distpach( eventSetActive(e))
    }

    const onSelectEvent = (e) => {
        distpach(eventSetActive(e))
    }

    const onViewChange = (e) => {
        setlastView(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = ({ events, start, end, isSelected }) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
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
                    events: CalendarEvent
                }}
            />

            <CalendarModal />
        </div>
    )
}
