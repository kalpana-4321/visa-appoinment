import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = await sql`
      SELECT id FROM users WHERE LOWER(email) = ${trimmedEmail} LIMIT 1;
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    // Hash password
    const { hash, salt } = hashPassword(password);

    // Insert user
    const userRows = await sql`
      INSERT INTO users (full_name, email, password_hash, salt)
      VALUES (${fullName.trim()}, ${trimmedEmail}, ${hash}, ${salt})
      RETURNING id, full_name, email, created_at;
    `;

    const newUser = userRows[0];
    const sessionToken = await createSession(newUser.id);

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set("gp_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create account." },
      { status: 500 }
    );
  }
}
