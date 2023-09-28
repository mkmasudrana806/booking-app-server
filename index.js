const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectMongoDb = require("./connection");
const port = process.env.PORT || 5000;

// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const hotelsRoutes = require("./routes/hotels");
const roomsRoutes = require("./routes/rooms");
const cookieParser = require("cookie-parser");

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes and middlewares
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/hotels", hotelsRoutes);
app.use("/rooms", roomsRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
// main api end point
app.get("/", (req, res) => {
  res.send("server is running");
});
// server connection
app.listen(port, () => {
  try {
    connectMongoDb(process.env.SERVER_URL);
  } catch (error) {
    throw error;
  }
  console.log("hotel server app listening on port ", port);
});
