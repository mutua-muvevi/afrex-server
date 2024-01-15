/**
 * NEW SHIPMENT CONTROLLER
 * ========================
 * This controller is responsible for creating a new shipment.
 *
 * Steps:
 * - Validate the request body
 * - Create a new shipment
 * - Save the shipment
 * - Log the success
 *
 */

//the imports
const Shipment = require("../../models/shipment/shipment");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");
const { performance } = require("perf_hooks");

// controller
exports.createShipment = async (req, res, next) => {
	let { shipper, cosignee, collector, departure, arrival, items, events, track_number } = req.body;

	//Step: validate the request body
	let errors = [];

	if (errors.length > 0) {
		logger.warn(
			`Validation error in CreateShipment Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//create the shipment
		const shipment = new Shipment({
			shipper,
			cosignee,
			collector,
			departure,
			arrival,
			items,
			events,
			track_number
		});

		//save the shipment
		await shipment.save();

		// send response to shipment
		res.status(201).json({
			success: true,
			message: "Shipment created successfully",
			data: shipment,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Shipment created successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Create Shipment Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}