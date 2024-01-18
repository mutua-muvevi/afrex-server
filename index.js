//root/index page

//package imports
require("dotenv").config({ path: "./config.env" });
const express = require("express");

const corsMiddleware = require("./config/cors");
const helmetMiddleware = require("./config/helmet");
const compressionMiddleware = require("./config/compression");
const rateLimitMiddleware = require("./config/ratelimit");
const requestMiddleware = require("./config/req");
const expressSanitizer = require("./config/expressSanitizer");
const databaseSanitizer = require("./config/databaseSanitizer");

//custom module imports and initialization
const app = express();
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/error");

//connect to database
connectDB();

// middleware
app.use(corsMiddleware);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmetMiddleware);
app.use(compressionMiddleware);
app.use(rateLimitMiddleware);
app.use(requestMiddleware);
app.use(expressSanitizer);
app.use(databaseSanitizer);

//routes
app.use("/api/lead", require("./routes/lead"));
app.use("/api/user", require("./routes/user"));
app.use("/api/storage", require("./routes/storage"));
app.use("/api/shipment", require("./routes/shipment"));
app.use("/api/email", require("./routes/email"));
app.use("/api/flight", require("./routes/flight"));
// app

//error middleware
app.use(errorHandler);

//define the port
const PORT = process.env.PORT || 5000;

//listen to the port
app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

// process termination after unhandles promise rejection
process.on("unhandledRejection", (error, promise) => {
	if(error){
		logger.error("Unhandled Promise Rejection Error :", error)
		process.exit(1)
	} else {
		logger.info("Unhandled Promise :", promise)
	}
})

// port connections
module.exports = app;

// require("./config/port")