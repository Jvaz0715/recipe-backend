const {
  checkIsEmpty,
  checkIsAlpha,
  checkIsAlphanumeric,
  checkIsEmail,
  // checkIsStrongPassword,
} = require("../../utils/authMethods");

//this function checks any incoming data is empty if is empty send error message back
//else go to the next middleware function next()
function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body;

  const { errorObj } = res.locals;

  for (let key in inComingData) {
    if (checkIsEmpty(inComingData[key])) {
      errorObj[key] = `${key} cannot be empty`;
    }
  }

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next();
  }
};

function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "Please fill out the form" });
  } else {
    let errorObj = {};
    res.locals.errorObj = errorObj;
    next();
  }
}; 

function checkIsEmailFunc(req, res, next) {
    const { errorObj } = res.locals;
  
    if (!checkIsEmail(req.body.email)) {
      errorObj.wrongEmailFormat = "Must be in email format!";
    }
  
    next();
};
  
function checkIsAlphaFunc(req, res, next) {
    const { errorObj } = res.locals;
    const inComingData = req.body;
    for (key in inComingData) {
      if (key === "firstName" || key === "lastName") {
        if (!checkIsAlpha(inComingData[key])) {
          errorObj[`${key}`] = `${key} can only have characters`;
        }
      }
    }
  
    next();
};
  
function checkIsAlphanumericFunc(req, res, next) {
    const { errorObj } = res.locals;
    if (!checkIsAlphanumeric(req.body.username)) {
      errorObj.usernameError = "username can only have characters and numbers";
    }
  
    next();
};

function checkIsStrongPasswordFunc(req, res, next) {
  const { errorObj } = res.locals;
  next();
};
  
module.exports = {
  checkIsEmptyFunc,
  checkIsUndefined,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  checkIsEmailFunc,
  checkIsStrongPasswordFunc,
};
  