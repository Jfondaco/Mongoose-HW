const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const fs = require("fs");
const handlebars = require("express-handlebars");
var routes = require("./routes/routes.js");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNews";
const PORT = process.env.PORT || 3000;
mongoose.connect(MONGODB_URI);

const app = express();

app.engine("handlebars", handlebars({ defaultLayout: "main" }), handlebars({partialsDir: ['views/partials/']}));
app.set("view engine", "handlebars");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/MongoScraper", {useNewUrlParser: true});

app.use(routes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});