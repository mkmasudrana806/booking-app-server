const router = require("express").Router();

// controller for below routes
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../controller/usersController");
const {
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

// UPDATE User
router.put("/:id", verifyUser, updateUser);

// DELETE User
router.delete("/:id", verifyUser, deleteUser);

// GET SINGLE USER
router.get("/:id", verifyUser, getUser);

// GET ALL UserS
router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
