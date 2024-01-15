/**
 * Lead model
 * ======================
 * This is the model for the lead collection in the database
 * 
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema options
const SchemaOptions = {
	timestamps: true,
	collection: "Email",
	optimisticConcurrency: true,
};

//the schema
const EmailSchema = new Schema(
	{
		email: {
			type: String,
			minLength: [4, "Minimum characters required for email is 4"],
			maxLength: [50, "Maximum characters required for email is 50"],
			match: [
				/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
				"Your email format should be __@__.__, instead got {VALUE}",
			],
			lowercase: true,
			trim: true,
			required: [true, "Email is required"],
			index: true,
		}
	}, SchemaOptions
);

// the model
const Email = mongoose.model("Email", EmailSchema);

//export the model
module.exports = Email;