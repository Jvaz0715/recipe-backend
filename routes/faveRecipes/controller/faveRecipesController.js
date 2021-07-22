const faveRecipe = require("../model/faveRecipe")

async function addRecipe(req, res, next) {
    const { dishName, dishImg, recipeURL } = req.body;

    try {
        const createdFaveRecipe = new faveRecipe({
            dishName: dishName,
            dishImg: dishImg,
            recipeURL: recipeURL,
        });

        await createdFaveRecipe.save();

        res.json({
            message: "Recipe saved to favorites!",
        });
    } catch(e) {
        next(e);
    }

};

async function deleteRecipe(req, res, next) {

}; 

async function getAllFaveRecipes(req, res, next) {

}; 



module.exports = {addRecipe, deleteRecipe, getAllFaveRecipes};