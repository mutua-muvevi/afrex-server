/**
 * EDIT CONTROLLER
 * ========================
 * This controller is responsible for deleting storage.
 *
 * Steps:
 * - Validate the request body
 * - delete storage
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
exports.deleteStorage = async (req, res, next) => {
	const { storageID } = req.params
	
	if (!storageID || !mongoose.Types.ObjectId.isValid(storageID)) {
		return next(new ErrorResponse("Invalid Storage", 400))
	}

	try {
		const start = performance.now();

		//find the storage and delete the storage
		const storage = await Storage.findByIdAndDelete(storageID)

		if (!storage) {
			logger.warn("Invalid storage!")
			return next(new ErrorResponse("Storage not found", 400))
		}

		// send response to storage
		res.status(201).json({
			success: true,
			message: "Storage deleted successfully",
			data: {},
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Storage deleted successfully for user: in ${
			end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Delete Storage Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}