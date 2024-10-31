const pool = require("./pool");

async function getAllTraits() {
  const { rows } = await pool.query("SELECT * FROM traits ORDER BY name");
  return rows;
}

async function insertTrait(name) {
  try {
    await pool.query("INSERT INTO traits (name) VALUES ($1)", [name]);
    return { success: true, message: 'Trait added successfully!' };
  }
  catch (error) {
    console.error("Error inserting trait:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

async function updateTrait() {

}

async function deleteTrait(name) {
    
}

async function getAllChamps() {
  const query =
    "SELECT champions.name AS champ, champions.cost AS cost, ARRAY_AGG(traits.name) AS trait FROM champions INNER JOIN champion_traits ON champions.id = champion_traits.champion_id INNER JOIN traits ON champion_traits.trait_id = traits.id GROUP BY champions.name, champions.cost ORDER BY champions.cost ASC, champions.name ASC";
  const { rows } = await pool.query(query);
  return rows.map(row => ({
    ...row,
    trait: row.trait ? row.trait.join(', ') : '' // Convert to comma-separated string or handle empty case
  }));
}

// Insert a champion along with its traits (with validation)
async function insertChamp(name, cost, trait1, trait2, trait3) {
  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Insert the champion into the `champions` table
    const insertChampionQuery = `
      INSERT INTO champions (name, cost) 
      VALUES ($1, $2) 
      RETURNING id
    `;
    const result = await pool.query(insertChampionQuery, [name, cost]);
    const championId = result.rows[0].id;

    // Helper function to get trait ID (throws an error if the trait doesn't exist)
    async function getTraitId(traitName) {
      if (!traitName) return null; // Skip if trait is null

      const traitResult = await pool.query(
        'SELECT id FROM traits WHERE name ILIKE $1',
        [traitName]
      );

      if (traitResult.rows.length === 0) {
        throw new Error(`Trait "${traitName}" does not exist.`);
      }

      return traitResult.rows[0].id;
    }

    // Fetch trait IDs (ensuring traits exist)
    const trait1Id = await getTraitId(trait1);
    const trait2Id = await getTraitId(trait2);
    const trait3Id = trait3 ? await getTraitId(trait3) : null; // Optional trait 3

    // Insert into the `champion_traits` table for each trait
    const insertChampionTraitQuery = `
      INSERT INTO champion_traits (champion_id, trait_id) VALUES ($1, $2)
    `;

    // Insert for Trait 1
    await pool.query(insertChampionTraitQuery, [championId, trait1Id]);

    // Insert for Trait 2
    await pool.query(insertChampionTraitQuery, [championId, trait2Id]);

    // Insert for Trait 3 (if it exists)
    if (trait3Id) {
      await pool.query(insertChampionTraitQuery, [championId, trait3Id]);
    }

    // Commit the transaction
    await pool.query('COMMIT');

    return { success: true, message: 'Champion added successfully!' };
  } catch (err) {
    // Rollback the transaction if there was an error
    await pool.query('ROLLBACK');
    console.error(err.message);
    return { success: false, message: err.message };
  }
}

async function updateChamp() {

}

async function deleteChamp() {

}

module.exports = {
  getAllTraits,
  getAllChamps,
  insertTrait,
  insertChamp,
};
