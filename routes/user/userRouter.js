const express = require("express");
const router = express.Router();

const {
    signup,
    login
} = require("./controller/userController");


const {
    checkIsEmptyFunc,
    checkIsUndefined,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
    checkIsEmailFunc,
    checkIsStrongPasswordFunc,
} = require("./helpers/authMiddleware");

const jwtMiddleWare = require('../utils/jwtMiddleware');

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