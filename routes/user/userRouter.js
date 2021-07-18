const express = require("express");
const router = express.Router();

const {
    signup,
} = require("./controller/userController");


const {
    checkIsEmptyFunc,
    checkIsUndefined,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
    checkIsEmailFunc,
    checkIsStrongPasswordFunc,
  } = require("./helpers/authMiddleware");

router.post(
    "/sign-up",
    checkIsUndefined,
    checkIsEmptyFunc,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
    checkIsEmailFunc,
    checkIsStrongPasswordFunc,
    signup
);

module.exports = router;