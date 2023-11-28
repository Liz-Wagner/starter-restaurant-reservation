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
);

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

//Validate reservation isn't in the past or on Tuesday
function reservationDateIsValid(req, res, next) {
  const datePattern = /^20[2-9][0-9]-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
  const submittedDate = req.body.data.reservation_date;

  const today = new Date();
  const dateCheck = new Date(submittedDate);
  const dayCheck = dateCheck.getUTCDay()

  if (!datePattern.test(submittedDate) || dateCheck < today || dayCheck === 2) {
    return next({
      status: 400,
      message: "Cannot make reservations for the past (reservation_date) or on Tuesdays"
    });
  }
  next();
}

//Reservation time is valid and between 10:30 - 21:30
function reservationTimeIsValid(req, res, next) {
  const timePattern = /^(1[0-9]|2[0-1]):[0-5][0-9]$/;
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  
  const resDateTime = new Date(`${reservation_date}T${reservation_time}`)
  const resHr = resDateTime.getHours();
  const resMin = resDateTime.getMinutes();

  if (
    (!timePattern.test(reservation_time)) ||
    (resHr === 10 && resMin < 30) ||
    (resHr < 10) || 
    (resHr === 21 && resMin > 30) ||
    (resHr > 21)
   ) {
    return next({
      status: 400,
      message: "reservation_time must be after opening and an hour before closing"
    })
   }
   next();
}

//Number of people is greater than 0 and a number
function partySizeIsValid(req, res, next) {
  const size = req.body.data.people;
  console.log("partySize", size)

  if (size < 1 || typeof size !== "number") {
    return next({
      status: 400,
      message: "people must be a number and greater than 0"
    })
  }
  next();
}


//validate reservation exists
async function reservationIsValid(req, res, next) {
  const id = req.params.reservationId;
  const reservation = await service.read(id)
  console.log("resId", req.params.id)
  
  if (reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${id} cannot be found.`
  });
}

//create new reservation
async function createReservation(req, res) {
    const data = await service.create(req.body.data)
    res.status(201).json({ data });
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation)
  res.json({ data });
}

async function destroy(req, res) {
  const { reservation } = res.locals;
  await service.delete(reservation.reservation_id)
  res.sendStatus(204);
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  console.log("qdate", date)
  if (date) {
    reservationList = await service.list(date);
    //console.log("list", reservationList)
  }
  res.json({ data: reservationList });
}


//returns specific resrevation
function read(req, res) {
  res.json({ data: res.locals.reservation })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    reservationDateIsValid,
    reservationTimeIsValid,
    partySizeIsValid,
    asyncErrorBoundary(createReservation)
  ],
  update: [
    asyncErrorBoundary(reservationIsValid),
    hasOnlyValidProperties,
    hasRequiredProperties,
    reservationDateIsValid,
    reservationTimeIsValid,
    partySizeIsValid,
    asyncErrorBoundary(update)
  ],
  read: [
    asyncErrorBoundary(reservationIsValid),
    read
  ],
  delete: [
    asyncErrorBoundary(reservationIsValid),
    asyncErrorBoundary(destroy)
  ],
};