export const runtime = "nodejs";

import { rankStudentsForJob } from "@/lib/llm/generateRankings.mjs";

export async function POST(request) {
  try {
    const body = await request.json();

    const { students, job } = body;

    if (!students || !Array.isArray(students)) {
      return Response.json(
        {
          success: false,
          error: "Students array is required."
        },
        { status: 400 }
      );
    }

    if (!job) {
      return Response.json(
        {
          success: false,
          error: "Job object is required."
        },
        { status: 400 }
      );
    }

    const rankings = await rankStudentsForJob(
      students,
      job
    );

    return Response.json({
      success: true,
      rankings
    });

  } catch (error) {
    console.error("Ranking error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to generate rankings."
      },
      { status: 500 }
    );
  }
}