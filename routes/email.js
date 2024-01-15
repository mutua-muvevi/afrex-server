const express = require("express");
const router = express.Router();

//middlewares
const { authMiddleware } = require("../middlewares/authentication");
const checkUserExistence = require("../middlewares/checkuser");

// controller inputs
const { postEmail } = require("../controllers/email/new");
const { fetchEmails, fetchEmailById } = require("../controllers/email/fetch");
const { deleteEmailById } = require("../controllers/email/delete");

//routes
router.post("/post", postEmail);
router.get(
	"/:userID/fetch/all",
	authMiddleware,
	checkUserExistence,
	fetchEmails
);
router.get(
	"/:userID/fetch/single/:emailID",
	authMiddleware,
	checkUserExistence,
	fetchEmailById
);
router.delete(
	"/:userID/delete/single/:emailID",
	authMiddleware,
	checkUserExistence,
	deleteEmailById
);

module.exports = router;