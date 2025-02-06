const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateTrait = [
  body("name")
  .trim()
  .isLength({ max: 100 }).withMessage("Name must be alphabetic and less than 100 characters")
  .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/).withMessage("Name should only contain letters with a single space between words"),
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

async function deleteOneTrait(req, res) {
  const { id } = req.params;
  try {
    await db.deleteTrait(id)
    res.status(200).json({ success: true, message: "Trait deleted successfully" });
  } catch (err) {
    console.error("Error deleting trait", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  getTraits,
  createTrait,
  validateTrait, 
  deleteOneTrait
};