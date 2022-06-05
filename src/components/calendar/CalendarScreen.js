import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { openModal } from '../../reducers/modalSlice'
import { messages } from '../helper/calendar-messages-es'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendarScreen.css'
import 'moment/locale/es'  // this is the config to change the language in moment
import {FaRegCalendarPlus} from 'react-icons/fa'

moment.locale('es')

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const distpach = useDispatch();


    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'Month')


    const doubleCLick = (e) => {
        distpach(openModal())
    }

    const onSelectEvent = (e) => {
        console.log(e)
    }

    const onViewChange = (e) => {
        setlastView(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = ({ event, start, end, isSelected }) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
    }

    const event = {
        title: 'cumpleanos de mi mama',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'comprar el pastel',
    }


    return (
        <div className='calendar-screen'>
            <Navbar />


            <Calendar
                localizer={localizer}
                event={event}
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

            <FaRegCalendarPlus onClick={ doubleCLick } className='add-event-button'/>
            <CalendarModal />
        </div>
    )
}
