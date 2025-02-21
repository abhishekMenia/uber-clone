const { createRide } = require("../services/ride.service");
const { validationResult } = require("express-validator");

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
    return res.status(200).json({ ride, message: "ride created" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
