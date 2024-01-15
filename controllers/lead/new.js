/**
 * NEW LEAD CONTROLLER
 * ========================
 * This controller is responsible for creating a new lead.
 *
 * Steps:
 * - Validate the request body
 * - Create a new lead
 * - Save the lead
 * - Push the lead to the user's leads array
 * - Create notification
 * - Log the success
 *
 */

//the imports
const Lead = require("../../models/lead/lead");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// controller
exports.createLead = async (req, res, next) => {
	const {
		fullname,
		message,
		email,
		telephone,
		city,
		country,
		leadSource,
		service,
	} = req.body;
	const user = req.user;

	//Step: validate the request body
	let errors = [];
	console.log("Lead Body", req.body);

	if (!fullname) errors.push("Lead fullname is required");
	if (!email) errors.push("Lead email is required");
	if (!country) errors.push("Lead country is required");
	if (!service) errors.push("Service ID is required");

	if (errors.length > 0) {
		logger.warn(
			`Validation error in CreateLead Controller: ${errors.join(", ")}`
		);
		return next(new ErrorResponse(errors.join(", "), 400));
	}

	try {
		const start = performance.now();

		//create the lead
		const lead = new Lead({
			fullname,
			message,
			email,
			telephone,
			city,
			country,
			leadSource,
			service,
		});
		
		if (!lead) {
			logger.error(`Error in creating new lead `);
			return next(new ErrorResponse("Error in creating lead", 500));
		}

		//save the lead
		await lead.save();

		// send response to lead
		res.status(201).json({
			success: true,
			message: "Lead created successfully",
			data: lead,
		});

		const end = performance.now();

		//logging success
		logger.info(
			`Lead created successfully for user: in ${
				end - start
			}ms`
		);
	} catch (error) {
		logger.error(`Error in CreateLead Controller: ${error.message}`);
		console.error("Error details:", error);
		next(error);
	}
};
