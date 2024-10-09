-- CREATE TABLE IF NOT EXISTS champions (
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(100) UNIQUE NOT NULL,
-- 	cost INTEGER NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS traits (
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(100) UNIQUE NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS champion_traits (
-- 	champion_id INTEGER REFERENCES champions(id) ON DELETE CASCADE,
-- 	trait_id INTEGER REFERENCES traits(id) ON DELETE CASCADE,
-- 	PRIMARY KEY (champion_id, trait_id)
-- );




