//import React from "react";
import ReservationsView from "./ReservationsView";


export default function ReservationsList({reservations}) {
    console.log("reserve", reservations)


    
    return (
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Party Size</th>
                </tr>
            </thead>
            {reservations?.map((reservation) => (
                <ReservationsView
                key={reservation.reservation_id} 
                reservation={reservation} 
            />
            ))}
        </table>
    )
}