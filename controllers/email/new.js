/**
 * Create Email Controller
 */

//the imports
const Email = require("../../models/email/email");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// controller
exports.postEmail = async (req, res, next) => {
	const { email } = req.body;
	const user = req.user;

	//Step: validate the request body
	let errors = [];

	if (!email) errors.push("Email is required");

	//email validation
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

	if (!emailRegex.test(email)) {
		errors.push("Email is invalid");
	}

	if (errors.length > 0) {
		logger.warn(
			`Validation error in CreateEmail Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//check if email already exists
		const emailExists = await Email.findOne({ email });

		//if so return suceess message to user
		if (emailExists) {
			logger.warn(`Email already exists in CreateEmail Controller`);
			return res.status(200).json({
				success: true,
				message: "You are already subscribed to our newsletter",
				data: emailExists,
			});
		}

		//create the email
		const newEmail = new Email({
			email,
		});
		
		if (!newEmail) {
			logger.error(`Error in creating new email `);
			return next(new ErrorResponse("Error in creating email", 500));
		}

		//save the email
		await newEmail.save();

		//log the success
		const timeTaken = (performance.now() - start).toFixed(2);
		logger.info(`New email created in ${timeTaken}ms`);

		//send the response
		res.status(201).json({
			success: true,
			message: "New email created successfully",
			data: newEmail,
		});
	} catch (error) {
		logger.error(`Error in creating new email: ${error}`);
		return next(new ErrorResponse("Error in creating new email", 500));
	}
};