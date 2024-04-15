const Pairing = require("../models/pairing.model");
const pairingID = require("../utils/paircode-generator.js");
const thumbnailGenerate = require("../utils/pair-thumbnail.js");

const newPairing = async (request, response) => {
  let idInstance = "";
  const thumbnailId = thumbnailGenerate();
  while (true) {
    idInstance = pairingID(8);
    const data = await Pairing.findOne({ id: idInstance });
    if (!data) {
      break;
    }
  }

  try {
    await Pairing.create({
      id: idInstance,
      pairName: request.body.pairName,
      adminUser: request.body.adminUser,
	  thumbnail: thumbnailId,
    });
    response.status(200).send("Object Created");
  } catch (e) {
    response.send(e);
  }
};

const getAllUserPairs = async (request, response) => {
  const currentUser = request.body.user;
  try {
	const data = await Pairing.find({
		$or: [{ adminUser: currentUser }, { otherUser: currentUser }],
	  });
	
	  response.status(200).send(data);
  }
  catch (e) {
	response.status(400).send(e);
  }
};

const addUserToPair = async (request, response) => {
    const pairID = request.body.pairID;
    const user = request.body.user;
    try {
        const existingPair = await Pairing.findOne({ id: pairID });

        if (!existingPair) {
            return response.status(404).send("Pair not found");
        }

        // Check if otherUser field is empty
        if (!existingPair.otherUser) {
            const updatedPair = await Pairing.findOneAndUpdate(
                { id: pairID }, 
                { otherUser: user },
                { new: true }
            );

            response.send(updatedPair);
        } else {
            response.status(400).send("This pairing is currently full");
        }
    } catch (e) {
        response.status(500).send("Internal Server Error");
    }
};

const uploadImage = async (request, response) => {
	const pairID = request.body.pairID;
    const user = request.body.user;
    const image = request.body.image;

    try {
        const pairing = await Pairing.findOne({ id: pairID });

        if (!pairing) {
            return response.status(404).send({ error: "Pairing not found" });
        }

        if (user === pairing.adminUser) {
            pairing.imageA = image;
        } else {
            pairing.imageB = image;
        }

        const updatedPair = await pairing.save();

        response.send(updatedPair);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
}

const sendImage = async (request, response) => {
    const pairID = request.body.pairID;
    const user = request.body.user;
    try {
        const pairing = await Pairing.findOne({ id: pairID });

        if (!pairing) {
            return response.status(404).send({ error: "Pairing not found" });
        }

        let imageData;
        if (user === pairing.adminUser) {
            imageData = pairing.imageB;
        } else {
            imageData = pairing.imageA;
        }


        // Send the image data as base64
        response.send({data: imageData});
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
}


module.exports = { newPairing, getAllUserPairs, addUserToPair, uploadImage, sendImage };
