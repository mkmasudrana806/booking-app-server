const createError = require("../utils/error");
const Room = require("../models/roomsModel");
const Hotel = require("../models/hotelsModel");

// CREATE ROOM
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      res.status(200).json(savedRoom);
    } catch (error) {
      next(createError(500, "Hotel is not found to create a room!"));
    }
  } catch (error) {
    next(createError(500, "Room is not saved"));
  }
};

// UPDATE ROOM
const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE ROOM
const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(createError(500, "Hotel is not found to create a room!"));
    }
    res.status(201).json("Room has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET SINGLE ROOM
const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};
// GET ALL ROOMS
const getAllRooms = async (req, res, next) => {
  const failed = true;
  if (failed)
    return next(createError(401, "Your are not allowed to access this"));
  try {
    const rooms = await Room.findById("ksdjfdsf");
    res.status(201).json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
};
