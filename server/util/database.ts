import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import { Session, User, UserWithPasswordHash } from '../../common/types';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Perform database queries:

export async function getAllUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      email
    FROM
      users
  `;
  return users.map((user) => camelcaseKeys(user));
}

export async function getUserByEmail(email?: string) {
  // Return undefined if email is falsy
  if (!email) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      first_name,
      last_name,
      email
    FROM
      users
    WHERE
      email = ${email}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserWithPasswordHashByEmail(email?: string) {
  // Return undefined if email is falsy
  if (!email) return undefined;

  const users = await sql<[UserWithPasswordHash]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function insertUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
) {
  const users = await sql`
    INSERT INTO users
      (first_name, last_name, email, password_hash)
    VALUES
      (${firstName}, ${lastName}, ${email}, ${passwordHash})
    RETURNING
      id,
      first_name,
      last_name,
      email
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}
