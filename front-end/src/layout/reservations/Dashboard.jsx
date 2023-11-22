import React, { useEffect, useState } from "react";
import ReservationsList from "./components/ReservationsList"
import ErrorAlert from "../ErrorAlert"
import { listReservations } from "../../utils/api";
import { today } from "../../utils/date-time";
import useQuery from "../../utils/useQuery";

console.log("today2", today)

export default function Dashboard() {
    const [date, setDate] = useState(today());
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(loadDashboard, [date]);

    function loadDashboard() {
        const abortController = new AbortController();
        setReservations([]);
        setError(null);
        listReservations({ date }, abortController.signal)
            .then(setReservations)
            .catch(setError);
        return () => abortController.abort();
    }
    console.log("res", reservations)

    const query = useQuery();
    let queryDate = query.get("date");
    useEffect(dateChange, [queryDate]);

    function dateChange() {
        if (queryDate) {
        setDate(queryDate);
        } else setDate(today());
    }

    return (
        <main>
            <h1>Dashboard</h1>
            <h3>Reservations for {date}</h3>
            <ReservationsList reservations={reservations} />
            <ErrorAlert error={error} />
        </main>
    )
}