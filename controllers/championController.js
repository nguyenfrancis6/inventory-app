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

module.exports = {
  getChamps,
};
