/**
 * Shipment Modal
 * ============================================================================
 * This modal is for shipment collection in the database
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema options
const SchemaOptions = {
	timestamps: true,
	collection: "Shipment",
	optimisticConcurrency: true,
};

//const item subschems
const ItemSchema = new Schema({
	description: {
		type: String,
		trim: true,
		index: true,
	},
	unit: {
		type: String,
	},
	weight: {
		type: String,
	},
	amount: {
		type: Number
	},

});

//the event subschema
const EventSchema = new Schema({
	date: {
		type: Date,
	},
	time: {
		type: String,
	},
	address: {
		type: String,
	},
	status: {
		type: String,
	},
	description: {
		type: String,
	},
});


// the schema
const Shipmentschema = new Schema({
	shipper: {
		fullname: { type: String },
		email: { type: String },
		telephone: { type: String },
		address: { type: String },
		company: { type: String },
	},
	cosignee: {
		fullname: { type: String },
		email: { type: String },
		telephone: { type: String },
		address: { type: String },
		company: { type: String },
	},
	collector: {
		fullname: { type: String },
		email: { type: String },
		telephone: { type: String },
		address: { type: String },
		company: { type: String },
	},
	departure: {
		address: { type: String },
		airport_code: { type: String },
		departure_date: { type: String },
		departure_time: { type: String },
	},
	arrival: {
		address: { type: String },
		airport_code: { type: String },
		arrival_date: { type: String },
		arrival_time: { type: String },
	},
	items: [ItemSchema],
	events: [EventSchema],
	track_number: {type: String, unique: true, index: true}
}, SchemaOptions);

//the model
const Shipment = mongoose.model("Shipment", Shipmentschema);

module.exports = Shipment;