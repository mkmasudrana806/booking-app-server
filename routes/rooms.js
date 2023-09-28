const router = require("express").Router();

// controller
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
} = require("../controller/roomsController");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE ROOM
router.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE ROOM
router.put("/:id", verifyAdmin, updateRoom);

// DELETE ROOM
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// GET SINGLE ROOM
router.get("/:id", getRoom);

// GET ALL ROOMS
router.get("/", getAllRooms);

module.exports = router;
