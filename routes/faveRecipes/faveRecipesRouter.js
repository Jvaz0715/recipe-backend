const express = require("express");
const router = express.Router();

const {
    addRecipe,
    deleteRecipe,
    getAllFaveRecipes,
} = require("./controller/faveRecipesController")

router.post("/add-recipe", addRecipe);

router.delete("/delete-recipe", deleteRecipe);

router.get("/get-all-fave-recipes", getAllFaveRecipes);

module.exports = router;

