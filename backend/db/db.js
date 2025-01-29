const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DbConnectUrl)
    .then(() => console.log("db connected !!"))
    .catch((e) => {
      console.log("error to connect db:",e);
    });
};

module.exports = connectToDb;
