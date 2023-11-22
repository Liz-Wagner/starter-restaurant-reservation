import React from "react";
import { today } from "../../../utils/date-time";

export default function ReservationsView({ reservation }) {
    <div className="reservation">
        <div className="header">
            <th>{today()}</th>
            <td>{reservation.last_name}, {reservation.first_name}</td>
        </div>
        
    </div>
}