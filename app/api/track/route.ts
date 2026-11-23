import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/track?ref=GP-XXXXX
export async function GET(request: NextRequest) {
  try {
    const ref = request.nextUrl.searchParams.get("ref");

    if (!ref) {
      return NextResponse.json(
        { success: false, error: "Reference ID or email is required" },
        { status: 400 }
      );
    }

    const trimmedRef = ref.trim();

    // Query Neon PostgreSQL
    const rows = await sql`
      SELECT id, reference_id, full_name, email, destination, visa_type,
             departure_date, return_date, status, created_at
      FROM visa_applications
      WHERE UPPER(reference_id) = UPPER(${trimmedRef})
         OR LOWER(email) = LOWER(${trimmedRef})
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "No application found matching this reference." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application: rows[0],
    });
  } catch (error: any) {
    console.error("Track query failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to query Neon database" },
      { status: 500 }
    );
  }
}
