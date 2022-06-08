import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';


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

const now = moment().minutes(0).seconds(0);

const dateStart = now.clone() //to set time from 3.45.52 to 4.00.00

const dateEnd = dateStart.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: dateEnd.toDate(),
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

    const { notes, title, start, end, id, user } = formValue;

    const handleInputChange = ({ target }) => {
        setformValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const closeModalBehave = () => {
        dispatch( uiCloseModal() )
        setformValue( initEvent )
    }

    const [startDate, setStartDate] = useState(now.toDate())

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setformValue({
            ...formValue,
            start: e
        })

    }

    const [endDate, setEndDate] = useState(dateEnd.toDate())

    const handleEndDateChange = (e) => {
        setEndDate(e);
        setformValue({
            ...formValue,
            end: e
        })
    }

    const [validTitle, setValidTitle] = useState(true)

    const [validNote, setValidNote] = useState(true)

    const handleSubmitForm = (e) => {
        e.preventDefault();


        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'testing', 'error')
        }

        if (title.trim().length < 3) {
            return setValidTitle(false)
        }
        
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
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={startDate}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={endDate}
                            minDate={startDate}  //para validar que la fecha de minima en comparacion a la fecha de inicio
                            className="form-control"
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
