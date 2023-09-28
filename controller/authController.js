const createError = require("../utils/error");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// USER REGISTER
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User Successfully created");
  } catch (error) {
    return next(createError(500, "Faild to create a new user"));
  }
};

// USER LOGIN
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isPasswordOk = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordOk) {
      return next(createError(401, "Invalid password"));
    }

    // create token
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.ACCESS_SECRET
    );

    const { password, isAdmin, ...othersDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...othersDetails });
  } catch (error) {
    return next(createError(500, "Faild to create a new user"));
  }
};
module.exports = {
  register,
  login,
};
