import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

 function CreateReservation() {
    //set state of form upon render
    const initialFormState = {
        fName: "",
        lName: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    //set state of data in form
    const [formData, setFormData] = useState({ ...initialFormState});

    const history = useHistory();

    //handle input changes to form
    const handleFormChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    //handle submit button
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newReservation = await createReservation(formData);
    //     history.push(`/dashboard?date=${reservation_date}`)
    // };

    return (
        <div>
            <h1>Create New Reservation</h1>
            <ReservationForm
                formData={formData}
                //handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
            />
        </div>
    )
}

export default CreateReservation;