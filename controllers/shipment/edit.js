/**
 * Edit SHIPMENT CONTROLLER
 * ========================
 * This controller is responsible for editing shipment.
 *
 * Steps:
 * - Validate the request body
 * - Create a edit shipment
 * - Save the shipment
 * - Log the success
 *
 */

//the imports
const mongoose = require("mongoose");
const Shipment = require("../../models/shipment/shipment");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

//controller
exports.editShipment = async (req, res, next) => {
	const { shipper, cosignee, collector, departure, arrival, items, events } = req.body;
	const { shipmentID } = req.params

	//Step: validate the request body
	let errors = [];

	if (!shipper) errors.push("Shipper is required");
	if (!cosignee) errors.push("Cosignee is required");
	if (!collector) errors.push("Collector is required");
	if (!departure) errors.push("Departure is required");
	if (!arrival) errors.push("Arrival is required");
	if (!items) errors.push("Items is required");
	if (!events) errors.push("Events is required");
	if(!shipmentID || !mongoose.isValidObjectId(shipmentID))


	if (errors.length > 0) {
		logger.warn(
			`Validation error in CreateShipment Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		console.log(req.body)
		console.log()
		const start = performance.now();

		//find the shipment
		const shipment = await Shipment.findById(shipmentID)

		if (!shipment){
			logger.warn("Invalid shipment!")
			return next(new ErrorResponse("Shipment not found", 400))
		}

		//edit the shipment
		const update = {
			shipper, cosignee, collector, departure, arrival, items, events 
		}

		const updatedShipment = await Shipment.findByIdAndUpdate(
			shipmentID,
			update,
			{ new: true }
		)

		if(!updatedShipment){
			logger.warn("Something went wrong while updating shipment",)
			return next(new ErrorResponse("Something went wrong while updating shipment", 400))
		}

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