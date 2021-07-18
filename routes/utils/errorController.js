const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

function dispatchErrorDevelopment(error, req, res) {
    if(req.originalUrl.startsWith("/api")) {
        return res.status(error.statusCode).json({
            status: error.status,
            error: error,
            message: error.message,
            stack: error.stack,
        });
    };
};

function dispatchErrorProduction(error, req, res) {
    if(req.originalUrl.startsWith("/api")) {
        if (error.isOperational) {
            return res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        };

        return res.status(error.statusCode).json({
            status: "Error",
            message: "Something is not right. Please Contact support @ (917) 123-4567 or email us at recipeApp@gmail.com",
        });
    };
};

function handleMongoDBDuplicate(err) {
    console.log(err);
    //the variables assigned come from the err object keyValue
    let errorMessageDuplicateKey = Object.keys(err.keyValue)[0];
    let errorMessageDuplicateValue = Object.values(err.keyValue)[0];
  
    //we have parse some data in here
    let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken please choose another one`;
    //using the errorMessageHandlerClass, we give it the message we created from the duplicate keys and an error code of 400
    return new ErrorMessageHandlerClass(message, 400);
}


module.exports = (err, req, res, next) => {
    // if none of these have any value, the second argument will be defaulted to
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    //here we are spreading the err object using ...
    // the err is a huge amount of info
    let error = { ...err };
    // console.log("4");
  
    //we then assign error.message to the huge err info's message. We parse it into one object for readability.
    error.message = err.message;
  
    //mongo and mongoose have different errors.
    // here we use mongo duplication error
    //if either error.code is true, the handleMongoDBDuplicate function will run with error as its argument
    if (error.code === 11000 || error.code === 11001) {
      // see handleMongoDBDuplicate() above
      error = handleMongoDBDuplicate(error);
    };
  
    if (process.env.NODE_ENV === "development") {
      //see the function above
      dispatchErrorDevelopment(error, req, res);
    } else {
      //see the function above
      dispatchErrorProduction(error, req, res);
    };
  
  };
  