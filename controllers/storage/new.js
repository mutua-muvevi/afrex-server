/**
 * NEW Storage CONTROLLER
 * ========================
 * This controller is responsible for creating a new storage.
 *
 * Steps:
 * - Validate the request body
 * - Create a new storage
 * - Save the storage
 * - Log the success
 *
 */

//the imports
const Storage = require("../../models/storage/storage");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");


// controller
exports.createStorage = async (req, res, next) => {
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

	let errors = [];

	if (!depositor) errors.push("Depositor is required");
	if (!acceptance) errors.push("Acceptance is required");
	if (!owner) errors.push("Owner is required");
	if (!productDetails) errors.push("Product Detail is required");

	if (errors.length > 0) {
		logger.warn(
			`Validation error in CreateStorage Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//create the storage
		const storage = new Storage({
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
		});

		//save the storage
		await storage.save();

		// send response to storage
		res.status(201).json({
			success: true,
			message: "Storage created successfully",
			data: storage,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Storage created successfully for user: in ${end - start}ms`
		);
	} catch (error) {
		logger.error(`Error in Create Storage Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
};
