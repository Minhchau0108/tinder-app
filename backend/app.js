const express = require("express");
require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userService = require("./services/user.service");
const app = express();
const responseService = require("./services/response.service");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`=== connected to mongodb ${MONGODB_URI}`))
  .catch((err) => console.log(err));

app.use("/api", indexRouter);

// Random one user on backend as current user
// Set current user id value to `app.locals.currentUserId`.
// We'll use `app.locals.currentUserId` in case GET methods where we cannot get `currentUserId`
// from client's request
userService.initCurrentUserId().then((data) => {
  app.locals.currentUserId = data;
});

app.use((err, _req, res, _next) => {
  console.log("ERROR", err);
  const statusCode = err.message.split(" - ")[0];
  const message = err.message.split(" - ")[1];
  if (!isNaN(statusCode)) {
    responseService.send(res, statusCode, false, { message });
  } else {
    responseService.send(res, 500, false, null, {
      message: "Internal Server Error",
      details: err.message,
    });
  }
});

module.exports = app;
