require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
app.use(cors());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const PORT = process.env.PORT || 5500;

require("./db");

app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => console.log("App is running on port " + PORT + " "));
