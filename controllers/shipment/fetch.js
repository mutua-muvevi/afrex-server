//imports
const mongoose = require("mongoose");
const Shipment = require("../../models/shipment/shipment");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

//fetch all shipments
exports.fetchAllShipments = async (req, res, next) => {
	try {
		const start = performance.now();

		//fetch all shipments
		const shipments = await Shipment.find({}).lean().sort({ createdAt: -1 });

		// send response to shipment
		res.status(201).json({
			success: true,
			message: "Shipments fetched successfully",
			data: shipments,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Shipments fetched successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Fetch All Shipments Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}

//fetch shipment by id
exports.fetchShipmentByID = async (req, res, next) => {
	const { shipmentID } = req.params

	if(!shipmentID || !mongoose.isValidObjectId(shipmentID)){
		return next(new ErrorResponse("Invalid Shipment", 400))
	}

	try {
		const start = performance.now();

		//find the shipment
		const shipment = await Shipment.findById(shipmentID)

		if (!shipment){
			logger.warn("Invalid shipment!")
			return next(new ErrorResponse("Shipment not found", 400))
		}

		// send response to shipment
		res.status(201).json({
			success: true,
			message: "Shipment fetched successfully",
			data: shipment,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Shipment fetched successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Fetch Shipment By ID Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}

//fetch shipment by track number
exports.fetchShipmentByTrackNumber = async (req, res, next) => {
	const { track_number } = req.params

	if(!track_number){
		return next(new ErrorResponse("Invalid Track Number", 400))
	}

	try {
		const start = performance.now();

		//find the shipment
		const shipment = await Shipment.findOne({track_number})

		if (!shipment){
			logger.warn("Invalid shipment!")
			return next(new ErrorResponse("Shipment not found", 400))
		}

		// send response to shipment
		res.status(201).json({
			success: true,
			message: "Shipment fetched successfully",
			data: shipment,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Shipment fetched successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Fetch Shipment By Track Number Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}