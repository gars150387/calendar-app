import React from 'react'
import {FaRegCalendarPlus} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { openModal } from '../../reducers/modalSlice'


export const Navbar = () => {
  const distpach = useDispatch()

  const handleNewEvent = () =>{
    distpach( openModal())
  }
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            Carlos
        </span>
        <div>
          <button>
          <FaRegCalendarPlus onClick={ handleNewEvent } className='add-event-button'/>

          </button>
        </div>

        <button className='btn btn-outline-danger'>
          <i className='fas fa-sign-out-alt' />
            <span> Salir</span>

        </button>
    </div>
  )
}