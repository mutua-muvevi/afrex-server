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
		airline: {
			type: String,
			maxLength: [100, "Maximum characters required for airline is 100"],
			trim: true,
			index: true,
		},
		aircraft: {
			type: String,
			maxLength: [100, "Maximum characters required for aircraft is 100"],
			trim: true,
			index: true,
		},
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