/**
 * Delete Email by emailID
 */

//imports
const Email = require("../../models/email/email");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");
const mongoose = require("mongoose");

//controller
exports.deleteEmailById = async (req, res, next) => {
	const user = req.user;
	const { emailID } = req.params;

	if (!mongoose.isValidObjectId(emailID)) {
		logger.warn(`Invalid emailID: ${emailID}`);
		return next(new ErrorResponse("Invalid emailID", 400));
	}

	try {
		const start = performance.now();

		//delete the email
		const email = await Email.findByIdAndDelete(emailID);

		if (!email) {
			logger.warn(`No email found with id: ${emailID}`);
			return next(new ErrorResponse("No email found", 404));
		}

		//send the response
		res.status(200).json({
			success: true,
			message: "Email deleted successfully",
			data: email,
		});

		//log the success
		const timeTaken = (performance.now() - start).toFixed(2);
		logger.info(`Email deleted by ${user.email} in ${timeTaken}ms`);
	} catch (error) {
		logger.error(`Error in deleting email: ${error.message}`);
		return next(new ErrorResponse("Error in deleting email", 500));
	}
};