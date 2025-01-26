const express = require("express");
const app = express();
const dotevn = require("dotenv");
dotevn.config();
const cors = require("cors");
const connectToDb = require("./db/db");

connectToDb();

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world i am back");
});

module.exports = app;
