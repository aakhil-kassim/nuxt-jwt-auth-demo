import bcrypt from 'bcrypt';
import { createJWT, validateJWT } from 'oslo/jwt';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { TimeSpan } from 'oslo';

async function openDb() {
  return open({
    filename: './config.db',
    driver: sqlite3.Database
  });
}

export async function getUserByUsername(username) {
  const db = await openDb();
  return db.get('SELECT * FROM users WHERE username = ?', username);
}

export async function getUserById(id) {
  const db = await openDb();
  return db.get('SELECT * FROM users WHERE id = ?', id);
}

export async function authenticate(username, password) {
  const user = await getUserByUsername(username);
  if (!user) {
    return null;
  }

  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    return null;
  }

  return user;
}

export async function createSessionToken(userId, rememberMe) {
  const config = useRuntimeConfig();
  const payload = { userId };
  const expiresIn = rememberMe ? parseInt(config.cookieRememberMeExpires) : parseInt(config.cookieExpires);
  const secretKey = new TextEncoder().encode(config.jwtSecret);

  return createJWT('HS256', secretKey, payload, {
    expiresIn: new TimeSpan(expiresIn, 'ms'),
  });
}

export async function verifySessionToken(token) {
  const config = useRuntimeConfig();
  const secretKey = new TextEncoder().encode(config.jwtSecret);

  try {
    return await validateJWT('HS256', secretKey, token);
  } catch {
    return null;
  }
}

export async function getUserFromSession(event) {
  const config = useRuntimeConfig();
  const token = getCookie(event, config.cookieName);
  if (!token) return null;

  try {
    const session = await verifySessionToken(token);
    return await getUserById(session.payload.userId);
  } catch {
    return null;
  }
}
