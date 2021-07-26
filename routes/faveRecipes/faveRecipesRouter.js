const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleware");

const {
    addRecipe,
    deleteRecipe,
    getAllFaveRecipes,
} = require("./controller/faveRecipesController")

router.post("/add-recipe",jwtMiddleware, addRecipe);

router.get("/get-all-fave-recipes", jwtMiddleware, getAllFaveRecipes);

router.delete("/delete-recipe/:id", jwtMiddleware, deleteRecipe);

module.exports = router;

