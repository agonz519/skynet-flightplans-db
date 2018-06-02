const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8001;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./controllers/flight_plans_controller");

app.use(routes);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});