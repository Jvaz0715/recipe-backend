const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
});

module.exports = mongoose.model("user", userSchema);

// User.js is where we create the blueprint of what we will need from the user when they sign up
// we will connect the frontend to the backend where we have more authorization needed for user signup