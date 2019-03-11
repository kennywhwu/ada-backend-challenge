const express = require("express");
const router = express.Router();

const Message = require("../models/message");

router.get("/", async (req, res, next) => {
  try {
    let messages = await Message.getAll();
    return res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.get("/:conversation_id", async (req, res, next) => {
  try {
    let messages = await Message.getOne(req.params.conversation_id);
    return res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let data = req.body;
    let message = await Message.create(data);
    return res.json({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
