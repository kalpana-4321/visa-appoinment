import { neon } from "@neondatabase/serverless";

const rawDatabaseUrl = process.env.DATABASE_URL || "";
// Strip any surrounding quotes if present
const databaseUrl = rawDatabaseUrl.replace(/^["']|["']$/g, "").trim();

if (!databaseUrl) {
  console.warn("DATABASE_URL is not set. Neon Postgres features may not function.");
}

export const sql = neon(databaseUrl);
