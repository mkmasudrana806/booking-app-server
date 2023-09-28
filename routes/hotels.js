const router = require("express").Router();

// controller for below routes
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
} = require("../controller/hotelsController");

// authorization middleware
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

// CREATE HOTEL
router.post("/", verifyAdmin, createHotel);

// UPDATE HOTEL
router.put("/:id", verifyAdmin, updateHotel);

// DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel);

// GET SINGLE HOTEL
router.get("/find/:id", getHotel);

// GET ALL HOTELS
router.get("/", getAllHotels);

// COUNT BY CITY
router.get("/countbycity", countByCity);

// COUNT BY TYPE
router.get("/countbytype", countByType);

module.exports = router;
