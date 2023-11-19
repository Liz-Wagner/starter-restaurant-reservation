import React from "react";
import { Link } from "react-router-dom";

export default function newReservationForm({handleSubmit, handleFormChange, formData }) {
    return (
        <div className="form-section">
            <form name="new reservation" onSubmit={handleSubmit}>
                <div className="form-section">
                    <label htmlFor="fName" className="fName">First Name:</label>
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        required={true}
                        onChange={handleFormChange}
                        value={formData.fName}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="lName" className="lName">Last Name:</label>
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="last name"
                        required={true}
                        onChange={handleFormChange}
                        value={formData.lName}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="mobileNumber" className="mobileNumber">Mobile Number:</label>
                    <input
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        placeholder="(012)345-6789"
                        required={true}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={handleFormChange}
                        value={formData.mobile_number}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="reservationDate" className="reservationDate">Date of Reservation:</label>
                    <input
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        placeholder="reservation date"
                        required={true}
                        onChange={handleFormChange}
                        value={formData.reservation_date}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="reservationTime">Time of Reservation:</label>
                    <input
                        id="reservation_time"
                        type="time"
                        name="reservation_time"
                        min="10:30"
                        max="21:30"
                        placeholder="hour"
                        required={true}
                        onChange={handleFormChange}
                        value={formData.reservation_time}
                    />
                    <span className="reservationTime"></span>
                </div>
                <div className="form-section">
                    <label htmlFor="partySize" className="partySize">Size of Party:</label>
                    <input
                        id="people"
                        type="number"
                        name="people"
                        placeholder=">=1"
                        required={true}
                        min="1"
                        onChange={handleFormChange}
                        value={formData.people}
                    />
                </div>
                <Link to="/dashboard"><button className="btn btn-primary" type="submit" onSubmit={handleSubmit}>Submit</button></Link> 
                <Link to=""><button className="btn btn-secondary">Cancel</button></Link>
                </form>
            </div>
    )
}