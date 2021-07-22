const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass")
const errorController = require("./routes/utils/errorController");

const userRouter = require("./routes/user/userRouter");
const faveRecipesRouter = require("./routes/faveRecipes/faveRecipesRouter");
// bring in future files

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
};

// we get this from the express-rate-limit package
//it sets a timeout if a user tries and fails too many times
const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000, //this is in millie second
  message:
    "Too many requests from this IP, please try again or contact support",
});

//we apply the limiter in an app.use to /api
app.use("/api", limiter);

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/favorite-recipes", faveRecipesRouter);

/* if nothing is matched before this, app.all will work as a catch all to handle various errors, since we don't know what will be the error always */
app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404 
    )
  );
});

app.use(errorController);

module.exports = app;