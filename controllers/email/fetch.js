/**
 * Fetch emails
 */

//imports

const Email = require("../../models/email/email");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");
const mongoose = require("mongoose");

//controller
exports.fetchEmails = async (req, res, next) => {
	const user = req.user;

	try {
		const start = performance.now();

		//fetch all emails
		const emails = await Email.find({}).sort({ createdAt: -1 });

		if(!emails) {
			logger.warn(`No emails found`);
			return next(new ErrorResponse("No emails found", 404));
		}

		//send the response
		res.status(200).json({
			success: true,
			message: "Emails fetched successfully",
			data: emails,
		});

		//log the success
		const timeTaken = (performance.now() - start).toFixed(2);
		logger.info(`Emails fetched by ${user.email} in ${timeTaken}ms`);
	} catch (error) {
		logger.error(`Error in fetching emails: ${error.message}`);
		return next(new ErrorResponse("Error in fetching emails", 500));
	}
};

/**
 * Fetch email by emailID
 */

//controller
exports.fetchEmailById = async (req, res, next) => {
	const user = req.user;
	const { emailID } = req.params;

	if (!mongoose.isValidObjectId(emailID)) {
		logger.warn(`Invalid emailID: ${emailID}`);
		return next(new ErrorResponse("Invalid emailID", 400));
	}

	try {
		const start = performance.now();

		//fetch the email
		const email = await Email.findById(emailID);

		if (!email) {
			logger.warn(`Email not found with emailID: ${emailID}`);
			return next(new ErrorResponse("Email not found", 404));
		}

		//send the response
		res.status(200).json({
			success: true,
			message: "Email fetched successfully",
			data: email,
		});

		//log the success
		const timeTaken = (performance.now() - start).toFixed(2);
		logger.info(`Email fetched by ${user.email} in ${timeTaken}ms`);
	} catch (error) {
		logger.error(`Error in fetching email: ${error.message}`);
		return next(new ErrorResponse("Error in fetching email", 500));
	}
};
