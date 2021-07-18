const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const User = require("../model/User");

async function signup(req, res, next) {
    const { firstName, lastName, username, email, password } = req.body;

    const { errorObj } = res.locals; //where does this come from?

    if (Object.keys(errorObj).length > 0) {
        return res.status(500).json({
            message: "failure",
            payload: errorObj,
        });
    };

    try {
        let salt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });

        await createdUser.save();

        res.json({
            message: "success - user created"
        });

    } catch(e) {
        next(e);
    }
}

async function login(req, res) {

}

module.exports = { signup, login };