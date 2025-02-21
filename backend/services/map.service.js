const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const key = process.env.MAP_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    );
    if (response.data.status === "OK") {
      return {
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng,
      };
    } else {
      throw new Error("unable to fetch coordinates");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports.getDistance = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("origin and destination are required");
  }
  const key = process.env.MAP_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${key}`
    );
    console.log("response:", response.data.rows[0].elements[0]);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("unable to fetch distance and time");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports.getSuggestions = async (input) => {
  const key = process.env.MAP_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${key}`
    );
    console.log("response:", response.data.predictions);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("unable to fetch distance and time");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
