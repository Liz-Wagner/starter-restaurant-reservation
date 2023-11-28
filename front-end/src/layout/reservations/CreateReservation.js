import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./components/ReservationForm";
import { createReservation } from "../../utils/api";
import { validateNewReservationDateTime } from "../../utils/date-time";
import ErrorAlert from "../ErrorAlert"; 

export default function CreateReservation() {
    //set state of form upon render
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    }
    //set state of data in form
    const [reservationFormData, setReservationFormData] = useState({ ...initialFormState});
    const [formErrors, setFormErrors] = useState([]);
    const history = useHistory();

    //handle input changes to form
    const handleFormChange = ({ target }) => {
        setReservationFormData({
            ...reservationFormData,
            [target.name]: target.value,
        });
    }

    const validateFormDateAndTimeInputs = () => {
        const returnedErrors = validateNewReservationDateTime(reservationFormData)
        console.log("returnerror", returnedErrors)
        if (returnedErrors.length === 0) {
            return true;
        } else {
            setFormErrors(returnedErrors)
            console.log("seterrors", formErrors)
            return false;
        }
    };

    //handle submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors([]);

        try {
            const abortController = new AbortController();
            if (validateFormDateAndTimeInputs()) {
                await createReservation({
                    ...reservationFormData,
                    //people: parseInt(reservationFormData.people)
                }, abortController.signal
                );
                setReservationFormData({ ...initialFormState })
                history.push(`/dashboard?date=${reservationFormData.reservation_date}`)            
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                setFormErrors([ ...formErrors, error ])
                
            }
            else return;
        }
    };
    console.log("formError", formErrors)

    return (
        <div>
            <h1>Create New Reservation</h1>
            {formErrors?.map((error, i) => {
                let key = i + 1;
                return <ErrorAlert key={key} error={error} />}
            )}
            <ReservationForm
                formData={reservationFormData}
                handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
            />
        </div>
    )
};