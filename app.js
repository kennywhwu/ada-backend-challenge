const express = require("express");

const app = express();

app.use("/messages", (req, res, next) => {
  try {
    return res.json({ msg: "HELLO" });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
