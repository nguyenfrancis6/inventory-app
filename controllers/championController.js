const db = require("../db/queries");

async function getChamps(req, res) {
  try {
    const champions = await db.getAllChamps();
    console.log(champions);
    res.render("champion", { champions: champions });
  } catch (err) {
    console.error("Error fetching champs", err);
    res.status(500).send("Server error");
  }
}

async function createChamp(req, res) {
  try {
    const { name, cost, trait1, trait2, trait3 } = req.body;
    console.log("Retrieved properties: ", name, cost, trait1, trait2, trait3);
    const champions = await db.insertChamp(name, cost, trait1, trait2, trait3);
    res.redirect('/')
  } catch (err) {
    console.error("Error inserting champ", err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getChamps,
  createChamp
};
