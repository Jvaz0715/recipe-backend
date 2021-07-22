const jwt = require("jsonwebtoken");
// we bring in the jwt package that helps create our webtoken

//we then create a async function that will check if a token exists
//if a valid token exists, a user will be able to sign up/login on the front end

async function checkJwtToken(req, res, next) {
    try {
      if (req.headers && req.headers.authorization) {
        let jwtToken = req.headers.authorization.slice(7);
  
        let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY);
        
        res.locals.decodedJwt = decodedJwt;
        next();
    
      } else {
        throw { message: "You Don't have permission! ", statusCode: 500 };
      }
    } catch (e) {
      res.status(e.statusCode).json({ message: e.message, error: e });
      return next(e);
      
    }
};

module.exports = checkJwtToken;