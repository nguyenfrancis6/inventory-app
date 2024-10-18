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

async function createTrait(req, res) {
  try {
    const { name } = req.body;
    console.log("Received trait name:", name);
    await db.insertTrait(name);
    res.redirect("/")
  } catch (err) {
    console.error("Error adding trait", err);
    res.status(500).json({ error: "Server error" }); // Return JSON error response
  }
}

module.exports = {
  getTraits,
  createTrait
};