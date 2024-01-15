const express = require("express");
const router = express.Router();

//middlewares
const { authMiddleware } = require("../middlewares/authentication");
const checkUserExistence = require("../middlewares/checkuser");

// controller inputs
const { createShipment } = require("../controllers/shipment/new");
console.log("Shipment Error Here")
const { editShipment } = require("../controllers/shipment/edit");
const {
	fetchAllShipments,
	fetchShipmentByID,
	fetchShipmentByTrackNumber,
} = require("../controllers/shipment/fetch");
const { deleteShipment } = require("../controllers/shipment/delete");

//routes
router.post("/:userID/post", authMiddleware, checkUserExistence, createShipment);
router.put(
	"/:userID/edit/:shipmentID",
	authMiddleware,
	checkUserExistence,
	editShipment
);
router.get("/fetch/all", fetchAllShipments);
router.get("/fetch/single/:shipmentID", fetchShipmentByID);
router.get("/fetch/track/:track_number", fetchShipmentByTrackNumber)
router.delete(
	"/:userID/delete/single/:shipmentID",
	authMiddleware,
	checkUserExistence,
	deleteShipment
);

//export
module.exports = router;