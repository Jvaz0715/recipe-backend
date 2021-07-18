class ErrorMessageHandlerClass extends Error {
    constructor(message, statusCode) {
        super(message, statusCode);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        console.log(this);
    }
};

module.exports = ErrorMessageHandlerClass;

/* 

we create a messageHandlerClass to deal with database errors. The point is to show message errors differentiated between production and development. In production, we wouldn't want the user to see what we see with errors.

we export the class to be used in errorController.js and app.js.

any time we see extends, like above with error, it is an object

*/