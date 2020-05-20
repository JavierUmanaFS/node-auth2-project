module.exports = {
  isValid,
  checkDepartment
};

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

function checkDepartment(req, res, next){
  // Might need a return
  const department = req.jwt.department;
  if(role === 1){
    next();
  } else {
    res.status(400).json({ message: "Incorrect Department"})
  }
}


