//import React from "react";
import ReservationsView from "./ReservationsView";


export default function ReservationsList({reservations}) {
    console.log("reserve", reservations)

    const reservationList = reservations?.map((reservation) => (
        <ReservationsView
            key={reservation.reservation_id} 
            reservation={reservation} 
        />

    ))
    
    return (
        <div>
            {reservationList}
        </div>
    )
}