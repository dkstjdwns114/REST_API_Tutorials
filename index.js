const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// set up express app
const app = express();

// connect to mongoDB
mongoose.connect("mongodb://localhost/ninjago", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/api"));

// error handling middleware
app.use(function (error, req, res, next) {
  // console.log(error);
  res.status(422).send({ error: error._message });
});

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});
