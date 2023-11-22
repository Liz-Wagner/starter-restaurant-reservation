import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./components/ReservationForm";
import { createReservation } from "../../utils/api";
import { validateNewReservationDateTime } from "../../utils/date-time";

 function CreateReservation() {
    //set state of form upon render
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
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

    function validateFormDateAndTimeInputs(reservationFormData) {
        const returnedErrors = validateNewReservationDateTime(reservationFormData)
        if (returnedErrors.length > 0) {
            setFormErrors(returnedErrors)
            return false;
        } else {
            return true;
        }
    }

    //handle submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors([]);

        try {
            if (validateFormDateAndTimeInputs) {
                await createReservation(reservationFormData);
                setReservationFormData({ ...initialFormState })
                history.push(`/dashboard?date=${reservationFormData.reservation_date}`)            
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                setFormErrors([ ...formErrors, error])
            }
            return null;
        }
    };

    return (
        <div>
            <h1>Create New Reservation</h1>
            <ReservationForm
                formData={reservationFormData}
                handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
            />
        </div>
    )
}

export default CreateReservation;