const db = require("../db/queries");

const { body, validationResult } = require("express-validator");
// cost, trait1, trait2, trait3
const validateChamp = [
  body("name")
    .trim()
    .isLength({ max: 100 }).withMessage("Name must be alphabetic and less than 100 characters")
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/).withMessage("Name should only contain letters with a single space between words"),
  body("cost").trim().isInt({ gt: 0, lt: 6 }),
  body("trait1").trim().notEmpty().withMessage("Trait 1 is required").isAlpha().withMessage("Trait 1 should only contain letters"),
  body("trait2").trim().notEmpty().withMessage("Trait 2 is required").isAlpha().withMessage("Trait 2 should only contain letters"),
  body("trait3").trim().optional({ values: "falsy" }).isAlpha().withMessage("Trait 3 should only contain letters"),
];

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If validation errors exist, send them as a response or re-render the form with errors
    return res.status(400).render("index", {
      errors: errors.array(),
      championData: req.body, // Send the submitted form data back to prefill the form
    });
  }
  try {
    const { name, cost, trait1, trait2, trait3 } = req.body;
    console.log("Retrieved properties: ", name, cost, trait1, trait2, trait3);
    await db.insertChamp(name, cost, trait1, trait2, trait3);
    res.render("index", {
      successMessage: "Champion successfully added!",  // Success message
      errors: [],                                      // Clear any previous errors
      championData: {}                                 // Clear form data after success
    });
  } catch (err) {
    console.error("Error inserting champ", err);
    res.status(500).send("Server error");
  }
}

async function deleteOneChamp(req, res) {
  const { id } = req.params;
  try {
    await db.deleteChamp(id);
    res.status(200).json({ success: true, message: "Champion deleted successfully" });
  } catch (err) {
    console.error("Error deleting champ", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  getChamps,
  createChamp,
  deleteOneChamp,
  validateChamp,
};
