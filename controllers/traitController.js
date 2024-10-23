const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateTrait = [
  body("name")
  .trim()
  .isLength({ max: 100 })
  .isAlpha().withMessage("Name should only contain letters")
  .withMessage("Name must be alphabetic and less than 100 characters")
]

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If validation errors exist, send them as a response or re-render the form with errors
    return res.status(400).render("index", {
      errors: errors.array(),
      championData: req.body, // Send the submitted form data back to prefill the form
    });
  }
  try {
    const { name } = req.body;
    console.log("Received trait name:", name);
    await db.insertTrait(name);
    res.render("index", {
      successMessage: "Trait successfully added!",  // Success message
      errors: [],                                      // Clear any previous errors
      traitData: {}                                 // Clear form data after success
    });
  } catch (err) {
    console.error("Error adding trait", err);
    res.status(500).json({ error: "Server error" }); // Return JSON error response
  }
}

module.exports = {
  getTraits,
  createTrait,
  validateTrait
};