/**
 * Storage Modal
 * ============================================================================
 * This modal is for shipment collection in the database
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema options
const SchemaOptions = {
	timestamps: true,
	collection: "Storage",
	optimisticConcurrency: true,
};

// the depositor subschema
const DepositorSchema = new Schema({
	fullname: { type: String },
	email: { type: String },
	telephone: { type: String },
	company: { type: String },
	address: { type: String },
})

//acceptance subschema
const AcceptanceSchema = new Schema({
	from: new Schema({
		date: {
			type: String,


		},
		time: {
			type: String,


		},
	}),
	to: new Schema({
		date: {
			type: String,


		},
		time: {
			type: String,


		},
	}),
})

const OwnerSchema = new Schema({
	fullname: {
		type: String,
	},
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true,
	},
	telephone: {
		type: String,
	},
	address: {
		type: String,
	},
	company: {
		type: String,
	},
	accountNo: {
		type: String,
	},
	identificationNo: {
		type: String,
	},
});

const ProductDetailSchema = new Schema({
	HSCode: {
		type: String,
	},
	packagesNo: {
		type: String,
	},
	netQuantity: {
		type: String,
	},
	marketRate: {
		type: String,
	},
	totalMarketValue: {
		type: String,
	},
	description: {
		type: String,
	},
});


const StorageSchema = new Schema({
	depositor: DepositorSchema,
	acceptance: AcceptanceSchema,
	owner: OwnerSchema,
	productDetails: [ProductDetailSchema],

	privateMarks: {
		type: String,
	},
	handlingCharges: {
		type: String,
	},
	assuredFor: {
		type: String,
	},
	receiptNumber: {
		type: String,
	},
	receiptValidUpTo: {
		type: String,
	},
	productOrigin: {
		type: String,
	},
	wareHouseLocation: {
		type: String,
	},
	receivedBy: {
		type: String,
	},
	depositDate: {
		type: String,
	},
	depositTime: {
		type: String,
	},
	track_number: {
		type: String,
		required: [true, "Track number is required "],
		unique: true
	},
	trackno: {type: String}

}, SchemaOptions)


//the model
const Storage = mongoose.model("Storage", StorageSchema);

module.exports = Storage;