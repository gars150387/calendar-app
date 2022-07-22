import React, { useState } from 'react'
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';
import { addHours, differenceInMinutes } from 'date-fns';


import "react-datepicker/dist/react-datepicker.css";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


const initEvent = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2),
    id: nanoid(),
    user: {
        id: '123',
        name: 'Carlos'
    }
}

export const CalendarModal = () => {

    const dispatch = useDispatch()

    const { modalOpen } =  useSelector( state => state.ui)

    const [formValue, setformValue] = useState(initEvent)

    const { notes, title  } = formValue;

    const handleInputChange = ({ target }) => {
        setformValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const onDateChanged = ( event, changing ) => {
        setformValue({
            ...formValue,
            [changing]: event
        })
    }

    const closeModalBehave = () => {
        dispatch( uiCloseModal() )
        setformValue( initEvent )
    }

    const [validTitle, setValidTitle] = useState(true)

    const [validNote, setValidNote] = useState(true)

    const handleSubmitForm = (e) => {
        e.preventDefault();


        const difference = differenceInMinutes( formValue.end, formValue.start )

        console.log( difference )

        if ( isNaN( difference ) || difference <= 0 ) {
            return Swal.fire('Error', '', 'error')
        }

        if (title.trim().length < 3) {
            return setValidTitle(false)
        }
        setValidTitle(true)
        
        if (notes.trim().length < 3) {
            return setValidNote(false)
        }
        setValidNote(true)

        
        closeModalBehave()
        dispatch(eventAddNew({
            ...formValue
        }))
    }


    return (
        <div>
            <Modal
                isOpen={modalOpen}   //modalBehave to add new state
                onRequestClose={closeModalBehave}
                closeTimeoutMS={200}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
            >

                <h1> Nuevo evento </h1>
                <hr />
                <form
                    onSubmit={handleSubmitForm}
                    className="container"
                >

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={ formValue.start }
                            onChange={(event) => onDateChanged( event, 'start')}
                            className="form-control"
                            dateFormat="Pp"
                            showTimeSelect
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DatePicker
                            selected={ formValue.end }
                            minDate={ formValue.start }
                            onChange={(event) => onDateChanged( event, 'end')}
                            className="form-control"
                            dateFormat="Pp"
                            showTimeSelect
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!validTitle && 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className={`form-control ${!validNote && 'is-invalid'} `}
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-`outline-primary btn-block"
                        disabled={false}
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>

            </Modal>
        </div>
    )
}
