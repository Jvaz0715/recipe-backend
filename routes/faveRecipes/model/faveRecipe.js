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
    }
});

module.exports = mongoose.model("faveRecipe", faveRecipeSchema);