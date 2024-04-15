const mongoose = require("mongoose");


var pairingSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	pairName: {
		type: String,
		required: true,
	},
	adminUser: {
		type: String,
		required: true,
	},
	otherUser: {
		type: String,
		default: "",
	},
	imageA: {
		type: String,
		default: "",
	},
	imageB: {
		type: String,
		default: "",
	},
	thumbnail: {
		type: Number,
		default: 0,
	}
});

module.exports = mongoose.model("Pairing", pairingSchema);
