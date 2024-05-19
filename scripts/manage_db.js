import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

(
  async () => {
    const db = await open({
      filename: './config.db',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
    `);
  }
)();

async function addUser(username, password) {
  const db = await open({
    filename: './config.db',
    driver: sqlite3.Database
  });
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    console.log(`User ${username} added successfully.`);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log(`Username ${username} already exists.`);
    } else {
      console.error('Error adding user:', error);
    }
  }
}

const [,, username, password] = process.argv;

if (username && password) {
  addUser(username, password);
} else {
  console.log('Usage: node <this_script>.js <username> <password>');
}
