import React from 'react'

export const CalendarEvent = ({ events }) => {

    const { title, user } = events
  return (
    <div>
        <span> { title } </span>
        <strong> { user } </strong>
    </div>
  )
}
