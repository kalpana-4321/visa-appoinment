import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/upload?referenceId=GP-XXXXX - Retrieve documents for an application
export async function GET(request: NextRequest) {
  try {
    const ref = request.nextUrl.searchParams.get("referenceId");

    if (!ref) {
      return NextResponse.json(
        { success: false, error: "referenceId parameter is required" },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT id, reference_id, document_type, file_name, file_size, mime_type, created_at
      FROM application_documents
      WHERE UPPER(reference_id) = UPPER(${ref.trim()})
      ORDER BY id ASC;
    `;

    return NextResponse.json({
      success: true,
      documents: rows,
    });
  } catch (err: any) {
    console.error("Fetch documents error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch documents." },
      { status: 500 }
    );
  }
}

// POST /api/upload - Handle file upload (Passport, Photo, Supporting docs)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const referenceId = (formData.get("referenceId") as string) || `TEMP-${Date.now()}`;
    const documentType = (formData.get("documentType") as string) || "supporting";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format size
    const sizeInKb = (file.size / 1024).toFixed(1);
    const sizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${sizeInKb} KB`;

    // Convert to data URI for secure inline persistence in Neon Postgres
    const base64Data = `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;

    const rows = await sql`
      INSERT INTO application_documents (
        reference_id, document_type, file_name, file_size, mime_type, file_data
      )
      VALUES (
        ${referenceId}, ${documentType}, ${file.name}, ${sizeFormatted}, ${file.type || "application/octet-stream"}, ${base64Data}
      )
      RETURNING id, reference_id, document_type, file_name, file_size, mime_type, created_at;
    `;

    return NextResponse.json({
      success: true,
      document: rows[0],
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload document." },
      { status: 500 }
    );
  }
}
