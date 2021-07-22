const mongoose = require("mongoose");

const faveRecipeSchema = new mongoose.Schema({
    dishName: {
        type: String,
        unique: true,
    },
    dishImg: {
        type: String,
    },
    recipeURL: {
        type: String,
        unique: true,
    },
    recipeID: {
        type: String,
        unique: true,
    }
});

module.exports = mongoose.model("faveRecipe", faveRecipeSchema);