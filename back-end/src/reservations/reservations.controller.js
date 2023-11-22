const service = require("./reservations.service")
const asyncErrorBoundary =  require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time", 
  "people"
)

const VALID_PROPERTIES = [
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time", 
  "people"
]

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field));

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
}

//validate reservation
async function reservationIsValid(req, res, next) {
  const id = req.params.id;
  const reservation = await _read(id)
  
  if (reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${id} not found`
  })
}

//create new reservation
async function createReservation(req, res) {
  const newReservation = ({
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data);
    const data = await service.create(newReservation)
    res.status(201).json({ data: data })
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  console.log("qdate", date)
  if (date) {
    reservationList = await service.list(date);
    console.log("list", reservationList)
  }
  res.json({ data: reservationList });
}


//looks for specific resrevation
function read(req, res) {
  res.json({ data: res.locals.reservation })
}

module.exports = {
list: asyncErrorBoundary(list),
create: [
  asyncErrorBoundary(hasOnlyValidProperties),
  asyncErrorBoundary(hasRequiredProperties),
  asyncErrorBoundary(createReservation)
],
read: [
  asyncErrorBoundary(reservationIsValid),
  read
],
}