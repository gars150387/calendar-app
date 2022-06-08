import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'


export const AddNewFab = () => {

    const dispatch= useDispatch()

    const handleNewEvent = () => {
        dispatch(uiOpenModal())
    }

    return (
        <button 
        onClick={ handleNewEvent }
        className='btn btn-primary fab'>
            <i className='fas fa-plus' />
        </button>
    )
}
