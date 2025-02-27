const express = require("express");
const { authUser, authCaptain } = require("../middleware/auth.middleware");
const router = express.Router();
const { body } = require("express-validator");
const {
  getCreateRide,
  getConfirmRide,
  getOtpCheck,
  getCompletedRide,
  getCaptainCancelRide,
  getPassengerCancelRide,
} = require("../controllers/ride.controller");

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

router.patch(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  getConfirmRide
);
// start ride
router.post(
  "/checkOtp",
  authCaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("invalid otp"),
  getOtpCheck
);
router.patch(
  "/completed",
  authCaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  getCompletedRide
);
router.patch(
  "/captainCancelled",
  authCaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  getCaptainCancelRide
);
router.patch(
  "/passengerCancelled",
  authUser,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  getPassengerCancelRide
);

module.exports = router;
