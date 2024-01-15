/**
 * Delete Flight Controller
 * 
 * Steps:
 * - Validate the request params
 * - Find and Delete the flight
 * - Return response to user
 */

//the imports
const Flight = require("../../models/flight/flight");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");
const mongoose = require("mongoose");

// controller
exports.deleteFlight = async (req, res, next) => {
	const { flightID } = req.params;

	//Step: validate the request body
	let errors = [];

	if(!mongoose.Types.ObjectId.isValid(flightID)) errors.push("Flight ID is invalid");

	if(errors.length > 0) {
		logger.warn(`Validation error in DeleteFlight Controller: ${errors.join(", ")}`);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//find and delete the flight
		const flight = await Flight.findByIdAndDelete(flightID);

		if(!flight) {
			logger.warn(`Flight not found in DeleteFlight Controller`);
			return next(new ErrorResponse("Flight not found", 404));
		}

		//return response to user
		logger.info(`Flight deleted successfully in ${performance.now() - start}ms`);
		res.status(200).json({
			success: true,
			message: "Flight deleted successfully",
			data: flight,
		});
	} catch (err) {
		logger.error(`Error in DeleteFlight Controller: ${err.message}`);
		next(err);
	}
};