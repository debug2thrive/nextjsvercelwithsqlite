import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'votes.db');

// Ensure database file exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
}

const db = new Database(dbPath);

// Initialize database schema
function initializeDatabase() {
  // Create colors table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS colors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

  // Create votes table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (color_id) REFERENCES colors(id)
    );
  `);

  // Insert default colors if they don't exist
  const colorCount = db.prepare('SELECT COUNT(*) as count FROM colors').get() as { count: number };
  if (colorCount.count === 0) {
    const insertColor = db.prepare('INSERT INTO colors (name) VALUES (?)');
    insertColor.run('Blue');
    insertColor.run('Yellow');
    insertColor.run('Green');
  }
}

// Initialize on module load
initializeDatabase();

export default db;

