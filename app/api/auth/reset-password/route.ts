import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Reset token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Verify token
    const tokenRows = await sql`
      SELECT id, user_id, email, expires_at, used
      FROM password_reset_tokens
      WHERE token = ${token}
      LIMIT 1;
    `;

    if (tokenRows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid password reset token." },
        { status: 400 }
      );
    }

    const resetRecord = tokenRows[0];

    if (resetRecord.used) {
      return NextResponse.json(
        { success: false, error: "This password reset link has already been used." },
        { status: 400 }
      );
    }

    if (new Date(resetRecord.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, error: "This password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash new password
    const { hash, salt } = hashPassword(newPassword);

    // Update user password
    await sql`
      UPDATE users
      SET password_hash = ${hash}, salt = ${salt}, updated_at = NOW()
      WHERE id = ${resetRecord.user_id};
    `;

    // Mark token as used
    await sql`
      UPDATE password_reset_tokens
      SET used = TRUE
      WHERE id = ${resetRecord.id};
    `;

    // Invalidate existing sessions for security
    await sql`
      DELETE FROM sessions WHERE user_id = ${resetRecord.user_id};
    `;

    return NextResponse.json({
      success: true,
      message: "Password has been successfully reset. You can now log in with your new password.",
    });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to reset password." },
      { status: 500 }
    );
  }
}
