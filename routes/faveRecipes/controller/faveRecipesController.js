const faveRecipe = require("../model/faveRecipe");
const User = require("../../user/model/User.js");


const getAllFaveRecipes = async (req, res) => {
    try {
        const { decodedJwt } = res.locals;
        let payload = await User.findOne({ email: decodedJwt.email })
            .populate({
                path: "recipes",
                model: faveRecipe,
                select:"-__v"
            })
            .select("-dishName -dishImg -recipeURL -__v -_id");
      

        res.json(payload);
        
      } catch (e) {
        res.status(500).json({ e: e, message: e.message });
      }
}; 

const addRecipe = async (req, res) => {
    try {
        const { dishName, dishImg, recipeURL, recipeID } = req.body;
        const createdFaveRecipe = new faveRecipe({
            dishName,
            dishImg,
            recipeURL,
            recipeID
        });

        const savedFaveRecipe = await createdFaveRecipe.save();
        
        const { decodedJwt } = res.locals;

        const foundTargetUser = await User.findOne({ email: decodedJwt.email });

        foundTargetUser.recipes.push(savedFaveRecipe._id);

        await foundTargetUser.save();

        res.json({message: "Recipe added to favorites!"});
    } catch(e) {
        res.status(500).json({ e: e, message: "Looks like that recipe already exists in your favorites" })
    }

};




const deleteRecipe = async (req, res, next) => {
    
    try {
        let deletedRecipe = await faveRecipe.findByIdAndRemove(req.params.id);

        const { decodedJwt } = res.locals;
        let foundUser = await User.findOne({ email: decodedJwt.email });
        let foundUserRecipeArray = foundUser.recipes;

        let filteredRecipeArray = foundUserRecipeArray.filter((id) => {
            id.toString() !== deletedRecipe._id.toString();
        })

        foundUser.recipes = filteredRecipeArray;
        await foundUser.save();
        res.json({ message: "success", payload: deletedRecipe });

        } catch (e) {
          next(e);
        }
}; 

module.exports = {addRecipe, deleteRecipe, getAllFaveRecipes};