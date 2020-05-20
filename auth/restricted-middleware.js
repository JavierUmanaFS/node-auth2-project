const jwt = require("jsonwebtoken");
const configVars = require("../config/vars.js");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {

    jwt.verify(token, configVars.jwtSecret , (error, decodedToken) =>{
      if(error){
        res.status(401).json({ message: "You cannot pass!"})
      } else {
        res.status(400).json({ message: "Please provide the authentication information"})
        next();
      }
    })
  }
}

module.exports = {
  restricted
};
