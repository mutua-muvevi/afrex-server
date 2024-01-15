/**
 * NEW EDIT CONTROLLER
 * ========================
 * This controller is responsible for creating a edit storage.
 *
 * Steps:
 * - Validate the request body
 * - edit storage
 * - Save the storage
 * - Log the success
 *
 */

//the imports
const mongoose = require("mongoose");
const Storage = require("../../models/storage/storage");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// controller
exports.editStorage = async (req, res, next) => {
	const {
		depositor,

		acceptance,

		owner,

		productDetails,

		privateMarks,
		handlingCharges,
		assuredFor,
		receiptNumber,
		receiptValidUpTo,
		productOrigin,
		wareHouseLocation,
		receivedBy,
		depositDate,
		depositTime,

		track_number,
	} = req.body;

	const { storageID } = req.params

	if (!storageID || !mongoose.isValidObjectId(storageID)) {
		return next(new ErrorResponse("Invalid Storage", 400))
	}

	//Step: validate the request body
	let errors = [];

	if (!depositor) errors.push("Depositor is required");
	if (!acceptance) errors.push("Acceptance is required");
	if (!owner) errors.push("Owner is required");
	if (!productDetails) errors.push("Product Detail is required");

	if(errors.length > 0){
		logger.warn(
			`Validation error in CreateStorage Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//find the storage
		const storage = await Storage.findById(storageID)

		if (!storage){
			logger.warn("Invalid storage!")
			return next(new ErrorResponse("Storage not found", 400))
		}

		//edit the storage
		const update = {
			depositor,

			acceptance,

			owner,

			productDetails,

			privateMarks,
			handlingCharges,
			assuredFor,
			receiptNumber,
			receiptValidUpTo,
			productOrigin,
			wareHouseLocation,
			receivedBy,
			depositDate,
			depositTime,

			track_number,
		}

		const updatedStorage = await Storage.findById(
			storageID,
			update,
			{ new: true }
		)

		// send response to storage
		res.status(201).json({
			success: true,
			message: "Storage edited successfully",
			data: updatedStorage,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Storage edited successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Edit Storage Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}
