const express = require("express");
const router = express.Router();

const Message = require("../models/message");

router.get("/", (req, res, next) => {
  try {
    console.log("res", res);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let data = req.body;
    console.log("data", data);
    let message = await Message.create(data);
    return res.json({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
