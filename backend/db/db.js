const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DbConnectUrl)
    .then(() => console.log("db connected !!"))
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectToDb;
