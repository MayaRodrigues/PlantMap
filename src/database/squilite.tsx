import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('plantmap.db');

export async function initDatabase() {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT,
      email TEXT,
      avatar TEXT,
      bio TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plant_name TEXT NOT NULL,
      scientific_name TEXT,
      image_uri TEXT NOT NULL,
      confidence REAL,
      disease TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      location_id INTEGER,
      identified_plant_name TEXT,
      disease_detected TEXT,
      confidence REAL,
      analyzed_at TEXT NOT NULL,
      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(plant_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_plants_user_id ON plants(user_id);
    CREATE INDEX IF NOT EXISTS idx_locations_user_id ON locations(user_id);
    CREATE INDEX IF NOT EXISTS idx_locations_plant_id ON locations(plant_id);
    CREATE INDEX IF NOT EXISTS idx_statistics_user_id ON statistics(user_id);
    CREATE INDEX IF NOT EXISTS idx_statistics_plant_id ON statistics(plant_id);
    CREATE INDEX IF NOT EXISTS idx_likes_plant_id ON likes(plant_id);
    CREATE INDEX IF NOT EXISTS idx_comments_plant_id ON comments(plant_id);
  `);

  // Usuário local padrão (id = 1). A tabela "plants" exige user_id por
  // causa da foreign key, então garantimos que esse usuário sempre exista.
  await db.runAsync(
    `INSERT OR IGNORE INTO users (id, name, username, created_at)
     VALUES (1, 'Você', '@voce', ?);`,
    [new Date().toISOString()]
  );
}