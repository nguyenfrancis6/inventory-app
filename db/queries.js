const pool = require("./pool");

async function getAllTraits() {
  const { rows } = await pool.query("SELECT * FROM traits");
  return rows;
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

module.exports = {
  getAllTraits,
  getAllChamps
};
