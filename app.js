const express = require("express");

const app = express();
app.use(express.json());

const messageRoutes = require("./routes/messages");

app.use("/messages", messageRoutes);

module.exports = app;
