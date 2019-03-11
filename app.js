const express = require("express");

const app = express();
app.use(express.json());

const messageRoutes = require("./routes/messages");

app.use("/messages", messageRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  if (err.stack) console.log(err.stack);
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
