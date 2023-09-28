const Hotel = require("../models/hotelsModel");
const createError = require("../utils/error");

// CREATE HOTEL
const createHotel = async (req, res) => {
  try {
    console.log("api hitting");
    const newHotel = new Hotel(req.body);
    console.log(newHotel);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE HOTEL
const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE HOTEL
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(201).json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET SINGLE HOTEL
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL HOTELS
const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(201).json(hotels);
  } catch (error) {
    next(error);
  }
};

// HOTEL COUNT BY CITY
const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  console.log(cities);
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(201).json(list);
  } catch (error) {
    next(createError(404, "City not found to count"));
  }
};

// HOTEL COUNT BY TYPE
const countByType = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(201).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
};
