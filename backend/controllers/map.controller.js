const {
  getAddressCoordinate,
  getDistance,
  getSuggestions,
} = require("../services/map.service");
const { validationResult } = require("express-validator");

const pricePerVehicle = {
  car: 17,
  auto: 10,
  moterCycle: 6,
};
const pricePerDistance = {
  car: 6,
  auto: 4,
  moterCycle: 2,
};
const pricePerTime = {
  car: 6,
  auto: 4,
  moterCycle: 2,
};

module.exports.getFare = async (origin, destination) => {
  const distanceTime = await getDistance(origin, destination);

  const fare = {
    car: Math.round(
      (distanceTime.distance.value * pricePerDistance.car) / 1000 +
        (distanceTime.duration.value * pricePerTime.car) / 60 +
        pricePerVehicle.car
    ),
    auto: Math.round(
      (distanceTime.distance.value * pricePerDistance.auto) / 1000 +
        (distanceTime.duration.value * pricePerTime.auto) / 60 +
        pricePerVehicle.auto
    ),
    moterCycle: Math.round(
      (distanceTime.distance.value * pricePerDistance.moterCycle) / 1000 +
        (distanceTime.duration.value * pricePerTime.moterCycle) / 60 +
        pricePerVehicle.moterCycle
    ),
  };
  console.log("fare:", fare, distanceTime);
  return { fare, distanceTime };
};

module.exports.getCoordinates = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { origin, destination } = req.query;
  try {
    // const distanceTime = await getDistance(origin, destination);

    let disTimeFare;

    disTimeFare = await module.exports.getFare(origin, destination);
    const { fare, distanceTime } = disTimeFare;

    console.log("fare 123:", fare);

    res.status(200).json({ fare, distanceTime });
  } catch (error) {
    res.status(404).json({ message: "distanceTime not found" });
  }
};
module.exports.getSuggestions = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { input } = req.query;
  try {
    const suggestions = await getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(404).json({ message: "suggestion not found" });
  }
};
