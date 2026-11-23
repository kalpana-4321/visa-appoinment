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
      SELECT id, reference_id, full_name, email, phone, destination, visa_type,
             departure_date, return_date, status, created_at
      FROM visa_applications
      WHERE UPPER(reference_id) = UPPER(${trimmedRef})
         OR LOWER(email) = LOWER(${trimmedRef})
      ORDER BY id DESC
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "No application found matching this reference." },
        { status: 404 }
      );
    }

    const application = rows[0];

    // Query attached documents
    const documents = await sql`
      SELECT id, document_type, file_name, file_size, mime_type, created_at
      FROM application_documents
      WHERE reference_id = ${application.reference_id}
      ORDER BY id ASC;
    `;

    return NextResponse.json({
      success: true,
      application,
      documents,
    });
  } catch (error: any) {
    console.error("Track query failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to query Neon database" },
      { status: 500 }
    );
  }
}
