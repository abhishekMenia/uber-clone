const {
  getCaptainsInTheRadius,
  getAddressCoordinate,
} = require("../services/map.service");
const { createRide } = require("../services/ride.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.getCreateRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    // console.log("ride", ride);
    res.status(200).json({ ride, message: "ride created" });
    const pickupCoordinates = await getAddressCoordinate(pickup);
    // console.log("coordinates :", pickupCoordinates);
    const captainInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2
    );
    // console.log("captains around :", captainInRadius);

    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    // console.log("user 123:", rideWithUser);
    captainInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "newRide",
        data: rideWithUser,
      });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getConfirmRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { rideId } = req.body;
  // console.log("ride id:", rideId);
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        captain: req.captain._id,
        status: "accepted",
      },
      { new: true } // Add this option to return the updated document
    );

    const captainWithRide = await rideModel
      .findOne({ _id: rideId })
      .populate("captain");
    const rideWithUser = await rideModel
      .findOne({ _id: rideId })
      .populate("user");
    // console.log("captain 123:", captainWithRide);
    // console.log("ride user id 123:", rideWithUser.user.socketId);
    // console.log("ride user id 123:", rideWithUser);
    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideConfirmed",
      data: captainWithRide,
    });
    console.log("ride accepted:", ride);
    return res.status(200).json({ ride, message: "captain accepted the ride" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getOtpCheck = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { otp, rideId } = req.body;

  const ride = await rideModel
    .findOneAndUpdate(
      { _id: rideId },
      { status: "ongoing" },
      { new: true } // Add this option to return the updated document
    )
    .select("+otp");
  console.log("ride ongoing:", ride);
  if (!ride) {
    return res.status(400).json("Invalid otp");
  }
  if (ride.otp === otp) {
    const rideWithUser = await rideModel
      .findOne({ _id: rideId })
      .populate("user");
    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideOngoing",
      data: ride,
    });

    return res.status(200).json({ status: true, message: "otp matched", ride });
  } else {
    return res
      .status(201)
      .json({ status: false, message: "Invalid otp entered" });
  }
};

module.exports.getCompletedRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "completed" },
      { new: true } // Add this option to return the updated document
    );
    console.log("ride completed:", ride);

    const rideWithUser = await rideModel
      .findOne({ _id: rideId })
      .populate("user");
    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideCompleted",
      data: ride,
    });
    return res.status(200).json({ ride, message: "ride completed" });
  } catch (error) {
    return res.status(500).json({ ride, message: error.message });
  }
};

module.exports.getCaptainCancelRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "cancelled" },
      { new: true } // Add this option to return the updated document
    );
    console.log("ride cancelled:", ride);
    const rideWithUser = await rideModel
      .findOne({ _id: rideId })
      .populate("user");
    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideCancelled",
      data: ride,
    });

    return res.status(200).json({ ride, message: "ride cancelled" });
  } catch (error) {
    return res.status(500).json({ ride, message: error.message });
  }
};
module.exports.getPassengerCancelRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "cancelled" },
      { new: true } // Add this option to return the updated document
    );
    console.log("ride 123:", ride);
    const captainWithRide = await rideModel
      .findOne({ _id: rideId })
      .populate("captain");

    sendMessageToSocketId(captainWithRide.user.socketId, {
      event: "rideCancelled",
      data: ride,
    });

    return res.status(200).json({ ride, message: "ride cancelled" });
  } catch (error) {
    return res.status(500).json({ ride, message: error.message });
  }
};
