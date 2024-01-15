/**
 * Delete SHIPMENT CONTROLLER
 * ========================
 * This controller is responsible for editing shipment.
 *
 * Steps:
 * - Validate the request body
 * - delete shipment
 * - Log the success
 *
 */

//imports
const mongoose = require("mongoose");
const Shipment = require("../../models/shipment/shipment");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

//controller
exports.deleteShipment = async (req, res, next) => {
	const { shipmentID } = req.params

	if(!shipmentID || !mongoose.isValidObjectId(shipmentID)){
		return next(new ErrorResponse("Invalid Shipment", 400))
	}

	try {
		const start = performance.now();

		//find the shipment and delete the shipment
		const shipment = await Shipment.findByIdAndDelete(shipmentID)

		if (!shipment){
			logger.warn("Invalid shipment!")
			return next(new ErrorResponse("Shipment not found", 400))
		}

		// send response to shipment
		res.status(201).json({
			success: true,
			message: "Shipment deleted successfully",
			data: {},
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Shipment deleted successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Delete Shipment Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}