const express = require("express");
const router = express.Router();
const Character = require("../../models/Character.js");
const User = require("../../models/User.js");

router.get("/", async (req, res) => {
  const myCharacters = await Character.query().where("user_id", req.session.userID);
  res.json({ results: myCharacters });
});

router.post("/create", async (req, res) => {
  const { name, species, status, image } = req.body;

  try {
    const user = await User.query().where("id", req.session.userID).limit(1);

    if (user[0]) {
      const newCharacter = await Character.query().insert({
        name,
        species,
        status,
        image,
        user_id: req.session.userID
      });
      return res.status(200).send({ status: 1, message: "Success, new character added" });
    }
    else if (!user[0]) {
      return res.status(404).send({ status: 0, message: "No user for this ID - Error" });
    }
  } catch (err) {
    return res.status(404).send({ status: 0, message: "Something went wrong with the database" });
  }
});

router.put("/update-character", async (req, res) => {
  const { name, species, status, image } = req.body;
  const { id } = req.query;

  try {
    const updatedCharacter = await Character.query().update({
      name,
      species,
      status,
      image
    }).where("id", id)
    if (updatedCharacter == 1) {
      return res.status(200).send({ status: 1, message: "Updated" })
    }
  } catch (err) {
    return res.status(404).send({ status: 0, message: "Something went wrong with the database" });
  }

})

router.delete("/delete/:id", async (req, res) => {
  try {
    const characterDeleted = await Character
      .query()
      .delete()
      .where("user_id", req.session.userID).andWhere("id", req.params.id)
    console.log(characterDeleted)
    if (characterDeleted == 1) {
      return res.status(200).send({ status: 1, message: "Deleted" });
    } else if (characterDeleted == 0) {
      return res.status(404).send({ status: 0, message: "Cant delete this characterID - Error" });
    }
  } catch (err) {
    return res.status(404).send({ status: 0, message: "Something went wrong with the database" });
  }
})

module.exports = router;
