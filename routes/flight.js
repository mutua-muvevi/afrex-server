const express = require("express");
const router = express.Router();

//middlewares
const { authMiddleware } = require("../middlewares/authentication");
const checkUserExistence = require("../middlewares/checkuser");

// controller inputs
const { createFlight } = require("../controllers/flight/new");
const {
	fetchFlights,
	fetchFlightByID,
	fetchFlightByAirport,
} = require("../controllers/flight/fetch");
const { deleteFlight } = require("../controllers/flight/delete");
const { editFlight } = require("../controllers/flight/edit");

//routes
router.post("/:userID/post", authMiddleware, checkUserExistence, createFlight);
router.get("/:userID/fetch/all", authMiddleware, checkUserExistence, fetchFlights);
router.get(
	"/:userID/fetch/single/:flightID",
	authMiddleware,
	checkUserExistence,
	fetchFlightByID
);
router.get(
	"/fetch/airport",
	fetchFlightByAirport
);
router.delete(
	"/:userID/delete/single/:flightID",
	authMiddleware,
	checkUserExistence,
	deleteFlight
);
router.put(
	"/:userID/edit/:flightID",
	authMiddleware,
	checkUserExistence,
	editFlight
);

//export
module.exports = router;