import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../../utils/api";
import { today, previous, next } from "../../utils/date-time";
import useQuery from "../../utils/useQuery";
import ReservationsList from "./components/ReservationsList"
import ErrorAlert from "../ErrorAlert"


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
    //console.log("res", reservations)

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
            <Link to={`/dashboard?date=${previous(date)}`}>
                <button className="btn btn-secondary" type="button">
                    Previous Day
                </button>
            </Link>
            <Link to={`/dashboard?date=${today(date)}`}>
            <button className="btn btn-secondary" type="button">
                    Today
                </button>
            </Link>
            <Link to={`/dashboard?date=${next(date)}`}>
                <button className="btn btn-secondary" type="button">
                    Next Day
                </button>
            </Link>
            <ReservationsList reservations={reservations} />
            <ErrorAlert error={error} />
        </main>
    )
}