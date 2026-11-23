import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if user exists in database
    const users = await sql`
      SELECT id, full_name, email FROM users WHERE LOWER(email) = ${trimmedEmail} LIMIT 1;
    `;

    if (users.length === 0) {
      // Don't leak user existence for security, but return generic success
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a reset link has been generated.",
      });
    }

    const user = users[0];
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store in password_reset_tokens
    await sql`
      INSERT INTO password_reset_tokens (token, user_id, email, expires_at)
      VALUES (${resetToken}, ${user.id}, ${trimmedEmail}, ${expiresAt.toISOString()});
    `;

    const resetUrl = `/reset-password?token=${resetToken}`;

    return NextResponse.json({
      success: true,
      message: "Password reset link generated successfully.",
      resetUrl,
      token: resetToken,
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate reset link." },
      { status: 500 }
    );
  }
}
