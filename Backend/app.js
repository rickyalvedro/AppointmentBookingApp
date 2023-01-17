const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");

var cors = require("cors");
const User = require("./models/User");

const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", userRoutes);



sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
