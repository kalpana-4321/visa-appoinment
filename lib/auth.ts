import crypto from "crypto";
import { sql } from "./db";

export interface UserSession {
  id: number;
  fullName: string;
  email: string;
}

// Hash password with scrypt and salt
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

// Verify password
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computedHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(computedHash, "hex"));
  } catch {
    return false;
  }
}

// Create a session in Neon PostgreSQL
export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await sql`
    INSERT INTO sessions (token, user_id, expires_at)
    VALUES (${token}, ${userId}, ${expiresAt.toISOString()});
  `;

  return token;
}

// Validate session and retrieve user
export async function getSessionUser(token: string): Promise<UserSession | null> {
  if (!token) return null;

  try {
    const rows = await sql`
      SELECT u.id, u.full_name, u.email
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ${token}
        AND s.expires_at > NOW()
      LIMIT 1;
    `;

    if (rows.length === 0) return null;

    return {
      id: rows[0].id,
      fullName: rows[0].full_name,
      email: rows[0].email,
    };
  } catch (err) {
    console.error("Session lookup error:", err);
    return null;
  }
}

// Delete session on logout
export async function deleteSession(token: string): Promise<void> {
  if (!token) return;
  try {
    await sql`DELETE FROM sessions WHERE token = ${token}`;
  } catch (err) {
    console.error("Session delete error:", err);
  }
}
