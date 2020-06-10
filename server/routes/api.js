const express = require("express");
const app = express();

const homemadeCharacterRoutes = require("./api/homemadecharacter");
const userRoutes = require("./api/user");

app.use("/homemadecharacter", homemadeCharacterRoutes);
app.use("/user", userRoutes);

module.exports = app;
