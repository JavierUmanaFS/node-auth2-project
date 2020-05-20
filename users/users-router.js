const router = require("express").Router();

const Users = require("./users-model.js");
const { restricted } = require("../auth/restricted-middleware.js");
// const { isValid, checkDepartment } = require("./users-service.js");

router.use(restricted);

router.get("/", (req, res) =>{
  Users.find()
  .then(users => {
    res.status(200).json({ users, jwt: req.jwt });
  })
  .catch(err => res.status(500).json({ errorMessage: err.errorMessage }))
});

module.exports = router;