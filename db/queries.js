const pool = require("./pool");

async function getAllTraits() {
  const { rows } = await pool.query("SELECT * FROM traits");
  return rows;
}

async function getAllChamps() {
  const { rows } = await pool.query("SELECT * FROM champions");
  return rows;
}

async function getChampAndTraits() {
  const query =
    "SELECT champions.name, traits.name	FROM champions INNER JOIN champion_traits ON champions.id = champion_traits.champion_id INNER JOIN traits ON champion_traits.trait_id = traits.id ORDER BY champions.name";
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllTraits,
  getAllChamps,
  getChampAndTraits
};
