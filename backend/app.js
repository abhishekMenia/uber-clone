const express = require("express");
const app = express();
const dotevn = require("dotenv");
dotevn.config();
const cors = require("cors");
const connectToDb = require("./db/db");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");
const mapRouter = require("./routes/map.route");
const rideRouter = require("./routes/ride.route");
const cookieParser = require("cookie-parser");

connectToDb();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("hello world i am back");
});
app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride", rideRouter);

module.exports = app;
