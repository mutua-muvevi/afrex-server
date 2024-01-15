/**
 * SERVICE EDIT CONTROLLER
 * ========================
 *
 * Steps:
 * - Validate the request body and params
 * - Find the user and Update the user
 * - Save the user
 * - Create a notification
 * - Log the success
 */
//the imports
const mongoose = require("mongoose");
const User = require("../../../models/user/user");

const ErrorResponse = require("../../../utils/errorResponse");
const logger = require("../../../utils/logger");

// controller

exports.editUser = async (req, res, next) => {
	const { fullname, email, country, city, telephone } = req.body
	const { user } = req

	//Step Validate the request body and params
	let errors = []

	if (!user || !user._id || !mongoose.Types.ObjectId.isValid(user._id))
		errors.push("Invalid user")

	if (errors.length > 0) {
		logger.warn(
			`Validation error in EditUser Controller: ${errors.join(", ")}`
		)
		return next(new ErrorResponse(errors.join(", "), 400))
	}

	let updatedUser = {}

	if (fullname) updatedUser.fullname = fullname
	if (email) updatedUser.email = email
	if (country) updatedUser.country = country
	if (city) updatedUser.city = city
	if (telephone) updatedUser.telephone = telephone

	try {
		const start = performance.now();

		// Find the user and update
		const theUser = await User.findOneAndUpdate(
			{ _id: user._id },
			updatedUser,
			{ new: true, runValidators: true, context: "query" }
		);

		if(!theUser) {
			return next(
				new ErrorResponse("User not found or user not authorized", 404)
			)
		}

		// Send the response
		res.status(201).json({
			success: true,
			message: "User updated successfully",
			data: user,
		});

		const end = performance.now();
		logger.info(
			`User : ${user._id} updated successfully for user: {${
				user._id
			}} in ${end - start}ms`
		);

	} catch (error) {
		logger.error(`Error in EditUser Controller: ${error.message}`);
		next(error);
	}
}