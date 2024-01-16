/**
 * EDIT FLIGHT CONTROLLER
 * ========================
 * This controller is responsible for editing a flight.
 * 
 * Steps:
 * - Validate the request body
 * - Find and Update the flight
 * - Save the flight
 * - Return response to user
 * 
 */

//the imports
const Flight = require("../../models/flight/flight");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");
const mongoose = require("mongoose");

// controller
exports.editFlight = async (req, res, next) => {
	const { flightID } = req.params;
	const {
		airplane,
		departureTime,
		arrivalTime,
		status,
		originAirport,
		destinationAirport,
	} = req.body;

	//Step: validate the request body
	let errors = [];

	if(!mongoose.Types.ObjectId.isValid(flightID)) errors.push("Flight ID is invalid");

	if(errors.length > 0) {
		logger.warn(`Validation error in EditFlight Controller: ${errors.join(", ")}`);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//find and update the flight
		const flight = await Flight.findByIdAndUpdate(flightID, {
			airplane,
			departureTime,
			arrivalTime,
			status,
			originAirport,
			destinationAirport,
		});

		if(!flight) {
			logger.warn(`Flight not found in EditFlight Controller`);
			return next(new ErrorResponse("Flight not found", 404));
		}

		//return response to user
		res.status(200).json({
			success: true,
			data: flight,
			message: "Flight updated successfully",
		});

		const end = performance.now();
		logger.info(`EditFlight Controller executed in ${end - start} ms`);

	} catch (error) {
		logger.error(`Error in EditFlight Controller: ${error.message}`);
		return next(new ErrorResponse("Server error", 500));
	}
};