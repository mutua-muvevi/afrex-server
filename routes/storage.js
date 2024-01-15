const express = require("express");
const router = express.Router();

//middlewares
const { authMiddleware } = require("../middlewares/authentication");
const checkUserExistence = require("../middlewares/checkuser");

// controller inputs
const { createStorage } = require("../controllers/storage/new");
const { editStorage } = require("../controllers/storage/edit");
const {
	fetchAllStorage,
	fetchStorageByID,
	fetchStorageByTrackNumber,
} = require("../controllers/storage/fetch");
const { deleteStorage } = require("../controllers/storage/delete");

//routes
router.post("/:userID/post", authMiddleware, checkUserExistence, createStorage);
router.put("/:userID/edit/:storageID", authMiddleware, checkUserExistence, editStorage);

router.get("/fetch/single/:storageID", fetchStorageByID);
router.get("/fetch/track/:track_number", fetchStorageByTrackNumber);
router.get("/fetch/all", fetchAllStorage);
router.delete(
	"/:userID/delete/single/:storageID",
	authMiddleware,
	checkUserExistence,
	deleteStorage
);

//export
module.exports = router;