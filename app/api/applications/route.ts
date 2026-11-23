import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/applications - Query applications & health check Neon DB connection
export async function GET() {
  try {
    const result = await sql`
      SELECT id, reference_id, full_name, destination, visa_type, status, created_at
      FROM visa_applications
      ORDER BY id DESC
      LIMIT 10
    `;

    return NextResponse.json({
      success: true,
      service: "Neon Postgres",
      count: result.length,
      applications: result,
    });
  } catch (error: any) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch from Neon database" },
      { status: 500 }
    );
  }
}

// POST /api/applications - Save new visa application to Neon PostgreSQL
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      destination,
      visaType,
      departureDate,
      returnDate,
      purpose,
      hotelAddress,
    } = body;

    if (!fullName || !email || !destination || !visaType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate reference ID: GP-XXXXX
    const referenceId = `GP-${Math.floor(10000 + Math.random() * 90000)}`;

    const rows = await sql`
      INSERT INTO visa_applications (
        reference_id, full_name, email, phone, destination, visa_type,
        departure_date, return_date, purpose, hotel_address, status
      )
      VALUES (
        ${referenceId}, ${fullName}, ${email}, ${phone || null},
        ${destination}, ${visaType}, ${departureDate || null}, ${returnDate || null},
        ${purpose || null}, ${hotelAddress || null}, 'Under Review'
      )
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      referenceId,
      application: rows[0],
    });
  } catch (error: any) {
    console.error("Database insert failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save application to Neon" },
      { status: 500 }
    );
  }
}
