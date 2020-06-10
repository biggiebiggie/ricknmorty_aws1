const express = require("express");
const app = express();

const apiRoutes = require("./routes/api");

//##    CORS   ##
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//##    Session  ##
const session = require("express-session");
app.use(
  session({
    secret: `this is a secret and shouldn't be shared in version control etc.`,
    resave: false,
    saveUninitialized: true
  })
);

const Knex = require("knex");
const KnexFile = require("./knexfile.js");
const knex = Knex(KnexFile.development);

const { Model } = require("objection");

Model.knex(knex);

app.use("/api", apiRoutes);

const server = app.listen(9090, error => {
  if (error) {
    console.log("Error running Express");
  }

  console.log("Server is running on port", server.address().port);
});
