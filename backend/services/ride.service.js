const { getFare } = require("../controllers/map.controller");
const rideModel = require("../models/ride.model");
const crypto = require("crypto");

const getOTP = (num) => {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  //   console.log("dikha de:", pickup);
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("userId, pickup, destination and vehicleType are required");
  }
  const fare = await getFare(pickup, destination);
  const otp = getOTP(6);
  console.log("bta do:", otp);
  // console.log("fare12345 :", fare.fare[vehicleType]);
  console.log("fare12345 :", fare.distanceTime);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: otp,
    fare: fare?.fare[vehicleType],
    distance: fare?.distanceTime?.distance?.text,
    duration: fare?.distanceTime?.duration?.text,
  });
  console.log("ride :", ride);

  return ride;
};
