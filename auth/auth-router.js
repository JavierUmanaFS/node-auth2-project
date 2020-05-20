const bcryptjs = require("bcryptjs");
const jwtConfig = require("../config/jwt-config.js");

const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if(isValid(credentials)){
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
    .then(user => res.status(201).json({ data: user}))
    .catch(err => res.status(500).json({ message: err.message}));
  } else {
    res.status(400).json({ message: "Please provide username and password. Password should be alphanumeric"});
  }
});

router.post("/login", (req, res) =>{
  const { username, password} = req.body;

  if(isValid(req.body)){
    Users.findBy({ username })
    .then(([user]) =>{
      // try to move bcrypt into its own file
      if(user && bcryptjs.compareSync(password, user.password)){
        const token = jwtConfig.createToken(user);
        res.status(200).json({ message: "Welcome to our API", token });
      } else {
        res.status(401).json({ message: "Invalid credentials"});
      }
    })
    .catch(err => res.status(500).json({ message: err.message }))
  } else {
    res.status(400).json({ message: "Please provide alphanumeric credentials"});
  }
});

module.exports = router;