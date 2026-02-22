import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "submissions.json");

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Read existing submissions
    let submissions = [];
    try {
      const existing = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
      submissions = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    // Add new submission with timestamp
    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      reviewed: false,
    });

    // Write back
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
