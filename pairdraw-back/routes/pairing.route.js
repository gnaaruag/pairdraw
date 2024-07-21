const express = require('express');
const route = express.Router();
require('dotenv').config();
const { newPairing, getAllUserPairs, addUserToPair, uploadImage, sendImage } = require("../controllers/pairing.controller");

route.post("/new-pair", newPairing);
route.post("/get-all-pairs", getAllUserPairs);
route.post("/add-to-pair", addUserToPair);
route.post("/upload-image", uploadImage);
route.post("/get-image", sendImage);




module.exports = route;
