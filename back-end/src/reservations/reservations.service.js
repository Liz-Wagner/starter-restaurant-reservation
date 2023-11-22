const knex = require("../db/connection");

//create and inserts new reservation
function create(newReservation) {
    return knex("reservations")
        .insert(newReservation, "*")
        .then((createdRecords) => createdRecords[0]);
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        //.whereNot({"status": status})
        .orderBy("reservation_time");
}

function read(id) {
    return knex("reservations")
    .select("*")
    .where({"reservation_id": id})
    .first();
}

module.exports = {
    create,
    list,
    read,
}