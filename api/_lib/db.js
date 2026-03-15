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
        event_type TEXT NOT NULL,
        season TEXT NOT NULL,
        name TEXT,
        phone TEXT,
        ip TEXT,
        user_agent TEXT,
        follow_up_status TEXT NOT NULL DEFAULT 'new',
        memo TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      ALTER TABLE lead_events
      ADD COLUMN IF NOT EXISTS follow_up_status TEXT NOT NULL DEFAULT 'new';
    `);

    await client.query(`
      ALTER TABLE lead_events
      ADD COLUMN IF NOT EXISTS memo TEXT;
    `);

    await client.query(`
      ALTER TABLE lead_events
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
    `);

    await client.query(`
      DO $$
      DECLARE
        constraint_name TEXT;
      BEGIN
        SELECT conname INTO constraint_name
        FROM pg_constraint
        WHERE conrelid = 'lead_events'::regclass
          AND contype = 'c'
          AND pg_get_constraintdef(oid) ILIKE '%event_type%';

        IF constraint_name IS NOT NULL THEN
          EXECUTE format('ALTER TABLE lead_events DROP CONSTRAINT %I', constraint_name);
        END IF;
      END $$;
    `);

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'lead_events_event_type_check'
            AND conrelid = 'lead_events'::regclass
        ) THEN
          ALTER TABLE lead_events
          ADD CONSTRAINT lead_events_event_type_check
          CHECK (event_type IN ('waitlist', 'like', 'inquiry', 'call_intent'));
        END IF;
      END $$;
    `);

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'lead_events_season_check'
            AND conrelid = 'lead_events'::regclass
        ) THEN
          ALTER TABLE lead_events
          ADD CONSTRAINT lead_events_season_check
          CHECK (season IN ('spring', 'summer', 'fall', 'winter'));
        END IF;
      END $$;
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS lead_events_waitlist_unique
      ON lead_events (season, phone)
      WHERE event_type = 'waitlist' AND phone IS NOT NULL;
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS lead_events_like_unique
      ON lead_events (season, phone)
      WHERE event_type = 'like' AND phone IS NOT NULL;
    `);

    schemaReady = true;
  } finally {
    client.release();
  }
};

