import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import modalSlice from '../../reducers/modalSlice';


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

const now = moment();

// const dateStart = moment().minutes(0).second(0).add( 1, 'hours') //to set time from 3.45.52 to 4.00.00

const end = moment().minutes(0).second(0).add(1, 'hours');

export const CalendarModal = () => {

    const dispatch = useDispatch()

    const [formValue, setformValue] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: end
    })

    const { notes, title } = formValue;

    const handleInputChange = ({ target }) => {

        setformValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    // const [modalBehave, setmodalBehave] = useState( true )  useState to manipulate modal behave

    // const closeModal = () => {
    //     setmodalBehave(false)
    // }

    const [startDate, setstartDate] = useState(now.toDate())

    const handleStartDateChange = (e) => {
        setstartDate(e);
        setformValue({
            ...formValue,
            start: e
        })
    }

    const [endDate, setEndDate] = useState(end.toDate())

    const handleEndDateChange = (e) => {
        setEndDate(e);
        setformValue({
            ...formValue,
            endt: e
        })
    }

    const [isValid, setisValid] = useState(true)

    const handleSubmitForm = (e) => {
        e.preventDefault();

        console.log(formValue)

        const momentStart = moment(startDate)
        const momentEnd = moment(endDate)

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'Fecha de finalizacion debe ser mayor a la fecha de inicio', 'error')
        }

        if (title.trim().length <= 2) {
            setisValid(false)
        } else {
            setisValid(true);
        }
    }

  
    return (
        <div>
            <Modal
                isOpen={false}   //modalBehave to add new state
                // onRequestClose={closeModal}
                closeTimeoutMS={200}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
            >

                <h1> Nuevo evento </h1>
                <hr />
                <form className="container">

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
                            className={`form-control ${!isValid && 'is-invalid'}`}
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
                            className="form-control"
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
                        className="btn btn-outline-primary btn-block"
                        onClick={handleSubmitForm}
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>

            </Modal>
        </div>
    )
}
