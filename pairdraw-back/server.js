require("dotenv").config();
const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");

const app = express();
connectDB();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

const corsOptions = {
  origin: ["https://pairdraw.vercel.app", "http://localhost:5173"],
};

// declare routes
//const someRoute = require('./routes/...')

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// enable routes
// app.use('/',someRoute);

const pairings = require("./routes/pairing.route");

app.use("/", pairings);

app.get("*", (request, response) => {
  response.send(404, "Not Found");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
