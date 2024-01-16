/**
 * CREATE FLIGHTS CONTROLLER
 * ========================
 * This controller is responsible for creating a new flight.
 *
 * Steps:
 * - Validate the request body
 * - Create a new flight
 * - Save the flight
 * - Return response to user
 *
 */

//the imports
const Flight = require("../../models/flight/flight");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// controller
exports.createFlight = async (req, res, next) => {
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

	if (!airplane) errors.push("Flight airline is required");
	if (!departureTime) errors.push("Flight departure time is required");
	if (!arrivalTime) errors.push("Flight arrival time is required");
	if (!status) errors.push("Flight status is required");
	if (!originAirport) errors.push("Flight origin airport is required");
	if (!destinationAirport)
		errors.push("Flight destination airport is required");

	if (errors.length > 0) {
		logger.warn(
			`Validation error in CreateFlight Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//create the flight
		const flight = new Flight({
			airplane,
			departureTime,
			arrivalTime,
			status,
			originAirport,
			destinationAirport,
		});

		//save the flight
		await flight.save();

		//return response to user
		res.status(201).json({
			success: true,
			message: "Flight created successfully",
			data: flight,
		});

		//log the success
		const end = performance.now();
		logger.info(
			`Flight created successfully in ${end - start} milliseconds`
		);
	} catch (error) {
		logger.error(`CreateFlight Controller: ${error.message}`);
		return next(new ErrorResponse("Internal server error", 500));
	}
};
