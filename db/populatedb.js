const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS champions (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE NOT NULL,
	cost INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS traits (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS champion_traits (
	champion_id INTEGER REFERENCES champions(id) ON DELETE CASCADE,
	trait_id INTEGER REFERENCES traits(id) ON DELETE CASCADE,
	PRIMARY KEY (champion_id, trait_id)
);

INSERT INTO champions (name, cost) VALUES
('Twitch', 1),
('Zilean', 2),
('Warwick', 1),
('Hwei', 3),
('Olaf', 4),
('Swain', 3),
('Diana', 5);

INSERT INTO traits (name) VALUES
('Frost'),
('Hunter'),
('Preserver'),
('Chrono'), 
('Blaster'),
('Shapeshifter'),
('Bastion'),
('Vanguard');

INSERT INTO champion_traits (champion_id, trait_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(2, 4),
(3, 1),
(3, 8),
(4, 1),
(4, 5),
(5, 1),
(5, 2),
(6, 1),
(6, 6),
(7, 1),
(7, 7);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
