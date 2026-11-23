import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// GET /api/applications - Query applications
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("gp_session")?.value;
    const user = token ? await getSessionUser(token) : null;

    let rows;
    if (user) {
      // If logged in, fetch user's applications
      rows = await sql`
        SELECT id, reference_id, full_name, email, destination, visa_type,
               departure_date, return_date, status, created_at
        FROM visa_applications
        WHERE user_id = ${user.id} OR LOWER(email) = LOWER(${user.email})
        ORDER BY id DESC;
      `;
    } else {
      // Otherwise public recent query
      rows = await sql`
        SELECT id, reference_id, full_name, destination, visa_type, status, created_at
        FROM visa_applications
        ORDER BY id DESC
        LIMIT 10;
      `;
    }

    return NextResponse.json({
      success: true,
      service: "Neon Postgres",
      count: rows.length,
      applications: rows,
    });
  } catch (error: any) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch from Neon database" },
      { status: 500 }
    );
  }
}

// POST /api/applications - Save full visa application to Neon PostgreSQL
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("gp_session")?.value;
    const user = token ? await getSessionUser(token) : null;

    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      dob,
      gender,
      passportNumber,
      nationality,
      passportIssueDate,
      passportExpiryDate,
      destination,
      visaType,
      departureDate,
      returnDate,
      purpose,
      hotelAddress,
      documents, // array of { fileName, fileSize, mimeType, documentType, fileData }
    } = body;

    if (!fullName || !email || !destination || !visaType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (Name, Email, Destination, Visa Type)." },
        { status: 400 }
      );
    }

    // Generate reference ID: GP-XXXXX
    const referenceId = `GP-${Math.floor(10000 + Math.random() * 90000)}`;

    const rows = await sql`
      INSERT INTO visa_applications (
        reference_id, user_id, full_name, email, phone, dob, gender,
        passport_number, nationality, passport_issue_date, passport_expiry_date,
        destination, visa_type, departure_date, return_date, purpose, hotel_address, status
      )
      VALUES (
        ${referenceId}, ${user ? user.id : null}, ${fullName.trim()}, ${email.trim().toLowerCase()},
        ${phone || null}, ${dob || null}, ${gender || null},
        ${passportNumber || null}, ${nationality || null}, ${passportIssueDate || null}, ${passportExpiryDate || null},
        ${destination}, ${visaType}, ${departureDate || null}, ${returnDate || null},
        ${purpose || null}, ${hotelAddress || null}, 'Under Review'
      )
      RETURNING *;
    `;

    const createdApp = rows[0];

    // If documents were provided in submission payload, persist them into application_documents
    if (Array.isArray(documents) && documents.length > 0) {
      for (const doc of documents) {
        if (doc.fileName && doc.fileData) {
          await sql`
            INSERT INTO application_documents (
              reference_id, document_type, file_name, file_size, mime_type, file_data
            )
            VALUES (
              ${referenceId}, ${doc.documentType || "supporting"}, ${doc.fileName},
              ${doc.fileSize || "Unknown"}, ${doc.mimeType || "application/octet-stream"}, ${doc.fileData}
            );
          `;
        }
      }
    }

    return NextResponse.json({
      success: true,
      referenceId,
      application: createdApp,
    });
  } catch (error: any) {
    console.error("Database insert failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save application to Neon" },
      { status: 500 }
    );
  }
}
