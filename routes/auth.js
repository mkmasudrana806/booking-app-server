const { register, login } = require("../controller/authController");

const router = require("express").Router();

// USER REGISTER
router.post("/register", register);
// USER LOGIN
router.post("/login", login);
module.exports = router;
