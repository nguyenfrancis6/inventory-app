const db = require("../db/queries");

async function getTraits(req, res) {
  try {
    const traits = await db.getAllTraits();
    console.log(traits);
    res.render("trait", { traits: traits });
  } catch (err) {
    console.error("Error fetching champs", err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getTraits
};