const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    getAllUsers,
    deleteUserById
} = require("./controller/userController");


const {
    checkIsEmptyFunc,
    checkIsUndefined,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
    checkIsEmailFunc,
    checkIsStrongPasswordFunc,
} = require("./helpers/authMiddleware");

// const jwtMiddleWare = require('../utils/jwtMiddleware');

router.get("/get-all-users", getAllUsers)
router.delete("/delete-user-by-id/:id", deleteUserById)

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

router.post(
    "/login",
    checkIsUndefined,
    checkIsEmptyFunc,
    checkIsEmailFunc,
    login
)

module.exports = router;