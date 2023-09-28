const User = require("../models/usersModel");
const createError = require("../utils/error");

// UPDATE
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET SINGLE USER
const getUser = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id });
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};
// GET ALL UserS
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

// GET ALL

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
