/**
 * Flight Model
 * ============================================
 * This model is responsible for storing and retrieving
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema options
const SchemaOptions = {
	timestamps: true,
	collection: "Flight",
	optimisticConcurrency: true,
};

//airplane schema
const AirplaneSchema = new Schema(
	{
		airline: {
			type: String,
			maxLength: [250, "Maximum characters required for airline is 250"],
		},
		aircraft: {
			type: String,
			maxLength: [250, "Maximum characters required for airline is 250"],
		},
		regNo: {
			type: String,
			maxLength: [250, "Maximum characters required for airline is 250"],
		},
	},
);

//departure subschema
const DepartureSchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		timezone: {
			type: String,
			required: true,
		},
	}
);

//arrival subschema
const ArrivalSchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		timezone: {
			type: String,
			required: true,
		},
	}
);

//status subschema
const StatusSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		}
	},
);

// origin airport subschema
const OriginAirportSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
);

// destination airport subschema
const DestinationAirportSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
);

//the schema
const FlightSchema = new Schema(
	{
		airplane: AirplaneSchema,
		departureTime: DepartureSchema,
		arrivalTime: ArrivalSchema,
		status: StatusSchema,
		originAirport: OriginAirportSchema,
		destinationAirport: DestinationAirportSchema,

	}, SchemaOptions
);

// the model
const Flight = mongoose.model("Flight", FlightSchema);

// export the model
module.exports = Flight;