import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("gp_session")?.value;
  if (!token) {
    return NextResponse.json({ success: true, user: null });
  }

  const user = await getSessionUser(token);
  return NextResponse.json({ success: true, user });
}
