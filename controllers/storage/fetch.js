//the imports
const mongoose = require("mongoose");
const Storage = require("../../models/storage/storage");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

//fetch all storage
exports.fetchAllStorage = async (req, res, next) => {
	try {
		const start = performance.now();
		
		//fetch all storage
		const storage = await Storage.find({}).lean().sort({ createdAt: -1 });
		
		// send response to storage
		res.status(201).json({
			success: true,
			message: "Storage fetched successfully",
			data: storage,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Storage fetched successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Fetch All Storage Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}

//fetch storage by id
exports.fetchStorageByID = async (req, res, next) => {
	const { storageID } = req.params

	if(!storageID || !mongoose.isValidObjectId(storageID)){
		return next(new ErrorResponse("Invalid Storage", 400))
	}

	try {
		const start = performance.now();

		//find the storage
		const storage = await Storage.findById(storageID)

		if (!storage){
			logger.warn("Invalid storage!")
			return next(new ErrorResponse("Storage not found", 400))
		}

		// send response to storage
		res.status(201).json({
			success: true,
			message: "Storage fetched successfully",
			data: storage,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Storage fetched successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Fetch Storage By ID Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}

//fetch storage by track_number
exports.fetchStorageByTrackNumber = async (req, res, next) => {
	const { track_number } = req.params

	if(!track_number){
		return next(new ErrorResponse("Invalid track number", 400))
	}

	try {
		const start = performance.now();

		//find the storage
		const storage = await Storage.findOne({track_number})

		if (!storage){
			logger.warn("Invalid storage!")
			return next(new ErrorResponse("Storage not found", 400))
		}

		// send response to storage
		res.status(201).json({
			success: true,
			message: "Storage fetched successfully",
			data: storage,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Storage fetched successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in Fetch Storage By Track Number Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
}