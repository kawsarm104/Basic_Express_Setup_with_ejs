//Basic Set Up
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const homeRouter = require("./router/homeRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const { homedir } = require("os");

const app = express();

dotenv.config();
process.env.APP_NAME;

//Database Connection require mongoose
mongoose
  .connect(process.env.MONGO_CONNECTIO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set up view engine
app.set("view engine", "ejs"); // by default views folder ta khujbe

// Setting up static folder (Public)
app.use(express.static(path.join(__dirname, "public")));

//parsing cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing set up
app.use("/", homeRouter);

// error handling(routing a kono route na thakele eta handle korbe )

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
