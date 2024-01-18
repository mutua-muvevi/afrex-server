/**
 * Fetch Flight Controller
 *
 */

//the imports
const Flight = require("../../models/flight/flight");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");
const mongoose = require("mongoose");

//fetch all flights
exports.fetchFlights = async (req, res, next) => {
	try {
		const start = performance.now();

		//find all flights
		const flights = await Flight.find({}).lean().sort({ createdAt: -1 });

		//return response to user
		logger.info(
			`Flights fetched successfully in ${performance.now() - start}ms`
		);
		res.status(200).json({
			success: true,
			message: "Flights fetched successfully",
			data: flights,
		});
	} catch (err) {
		logger.error(`Error in FetchFlights Controller: ${err.message}`);
		next(err);
	}
};

//fetch flight by departure time and arrival time
exports.fetchFlightByTime = async (req, res, next) => {
	const { departureTime, arrivalTime } = req.query;

	//Step: validate the request body
	let errors = [];

	if (!departureTime) errors.push("Flight departure time is required");
	if (!arrivalTime) errors.push("Flight arrival time is required");

	if (errors.length > 0) {
		logger.warn(
			`Validation error in FetchFlightByTime Controller: ${errors.join(
				", "
			)}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//find all flights
		const flights = await Flight.find({
			departureTime: departureTime,
			arrivalTime: arrivalTime,
		})
			.lean()
			.sort({ createdAt: -1 });

		//return response to user
		logger.info(
			`Flights fetched successfully in ${performance.now() - start}ms`
		);
		res.status(200).json({
			success: true,
			message: "Flights fetched successfully",
			data: flights,
		});
	} catch (err) {
		logger.error(`Error in FetchFlightByTime Controller: ${err.message}`);
		next(err);
	}
};

//fetch flight by originAirport.name and destinationAirport.name
exports.fetchFlightByAirport = async (req, res, next) => {
	const { originAirport, destinationAirport } = req.query;

	//Step: validate the request body
	if (!originAirport || !destinationAirport) {
		const errorMessage =
			"Flight origin and destination airports are required";
		logger.warn(
			`Validation error in fetchFlightByAirport: ${errorMessage}`
		);
		return next(new ErrorResponse(errorMessage, 400));
	}

	try {
		const start = performance.now();

		//find all flights
		const flights = await Flight.find({
			"originAirport.name": originAirport,
			"destinationAirport.name": destinationAirport,
		})
			.lean()
			.sort({ createdAt: -1 });

			console.log("flights", flights)

		//return response to user
		logger.info(
			`Flights fetched successfully in ${performance.now() - start}ms`
		);
		res.status(200).json({
			success: true,
			message: "Flights fetched successfully",
			data: flights,
		});
	} catch (err) {
		logger.error(
			`Error in FetchFlightByAirport Controller: ${err.message}`
		);
		next(err);
	}
};

//fetch by id
exports.fetchFlightByID = async (req, res, next) => {
	const { flightID } = req.params;

	//Step: validate the request body
	let errors = [];

	if (!mongoose.Types.ObjectId.isValid(flightID))
		errors.push("Flight ID is invalid");

	if (errors.length > 0) {
		logger.warn(
			`Validation error in FetchFlightByID Controller: ${errors.join(
				", "
			)}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//find the flight
		const flight = await Flight.findById(flightID).lean();

		if (!flight) {
			logger.warn(`Flight not found in FetchFlightByID Controller`);
			return next(new ErrorResponse("Flight not found", 404));
		}

		//return response to user
		logger.info(
			`Flight fetched successfully in ${performance.now() - start}ms`
		);
		res.status(200).json({
			success: true,
			message: "Flight fetched successfully",
			data: flight,
		});
	} catch (err) {
		logger.error(`Error in FetchFlightByID Controller: ${err.message}`);
		next(err);
	}
};
