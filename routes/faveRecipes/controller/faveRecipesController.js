const faveRecipe = require("../model/faveRecipe")

async function addRecipe(req, res, next) {
    const { dishName, dishImg, recipeURL, recipeID } = req.body;

    try {
        const createdFaveRecipe = new faveRecipe({
            dishName: dishName,
            dishImg: dishImg,
            recipeURL: recipeURL,
            recipeID: recipeID,
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

async function getAllFaveRecipes(req, res) {
    try {
        let payload = await faveRecipe.find({});

        res.json(payload);
        
      } catch (e) {
        res.status(500).json({ e: e, message: e.message });
      }
}; 


module.exports = {addRecipe, deleteRecipe, getAllFaveRecipes};