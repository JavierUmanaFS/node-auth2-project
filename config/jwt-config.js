const jwt = require("jsonwebtoken");
const configVars = require("./vars.js");

module.exports = {
  createToken
};

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department,
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, configVars.jwtSecret, options);
}