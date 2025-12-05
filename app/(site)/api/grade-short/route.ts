export const dynamic = 'force-dynamic';   // ← THIS LINE FIXES THE VERCEL ERROR

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question, idealAnswer, userAnswer } = await req.json();

    const prompt = `
You are an expert evaluator for OsTutelage Scholarship Exam.

Question: "${question}"
Ideal Answer: "${idealAnswer}"

User's Answer: "${userAnswer}"

Grade on 0–10 scale:
1. Accuracy (0-4)
2. Clarity (0-3)
3. Completeness (0-3)

Return ONLY JSON:
{
  "score": 8,
  "feedback": "Clear and accurate. Missed example."
}
`.trim();

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { score: 0, feedback: "AI service error." },
        { status: 500 }
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(content.trim());
      return NextResponse.json({
        score: Number(parsed.score) || 5,
        feedback: parsed.feedback || "No feedback.",
      });
    } catch (parseError) {
      return NextResponse.json({ score: 5, feedback: "AI response was not valid JSON." });
    }
  } catch (error) {
    console.error("Grading error:", error);
    return NextResponse.json(
      { score: 0, feedback: "Server error during grading." },
      { status: 500 }
    );
  }
}