import { Pool } from "pg";

let pool;
let schemaReady = false;

export const getPool = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  return pool;
};

export const ensureSchema = async () => {
  if (schemaReady) {
    return;
  }

  const client = await getPool().connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS lead_events (
        id BIGSERIAL PRIMARY KEY,
        event_type TEXT NOT NULL CHECK (event_type IN ('waitlist', 'like')),
        season TEXT NOT NULL CHECK (season IN ('spring', 'summer', 'fall', 'winter')),
        name TEXT,
        phone TEXT,
        ip TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS lead_events_waitlist_unique
      ON lead_events (season, phone)
      WHERE event_type = 'waitlist' AND phone IS NOT NULL;
    `);

    schemaReady = true;
  } finally {
    client.release();
  }
};
