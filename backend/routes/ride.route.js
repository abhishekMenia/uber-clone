const express = require("express");
const { authUser } = require("../middleware/auth.middleware");
const router = express.Router();
const { body } = require("express-validator");
const { getCreateRide } = require("../controllers/ride.controller");

router.post(
  "/create",
  authUser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moterCycle"])
    .withMessage("Invalid vehicle type"),
  getCreateRide
);

module.exports = router;
