import React from "react";

export default function ReservationsView({ reservation }) {

    return (
            <tbody>
                <tr className="reservation">
                    <td rowSpan="2" className="resTime">
                        {reservation.reservation_time}
                    </td>
                    <td rowSpan="2" className="name">
                        {reservation.last_name}, {reservation.first_name}
                    </td>
                    <td rowSpan="2" className="phoneNumber">
                        {reservation.mobile_number}
                    </td>
                    <td rowSpan="2" className="partySize">
                        {reservation.people}
                    </td>
                </tr>
            </tbody>
    )
}