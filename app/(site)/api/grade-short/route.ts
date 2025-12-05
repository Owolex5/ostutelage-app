export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question, idealAnswer, userAnswer } = await req.json();

    // Early exit if no key
    if (!process.env.GROK_API_KEY) {
      return NextResponse.json(
        { score: 0, feedback: "API key not configured on server." },
        { status: 500 }
      );
    }

    const prompt = `
You are an expert evaluator for OsTutelage Scholarship Exam.

Question: "${question}"
Ideal Answer: "${idealAnswer}"

User's Answer: "${userAnswer}"

Grade on 0–10 scale:
1. Accuracy (0-4): How factually correct is it?
2. Clarity (0-3): How well-written and easy to understand?
3. Completeness (0-3): Does it cover key points fully?

Return ONLY valid JSON (no extra text):
{
  "score": 8,
  "feedback": "Clear and accurate. Minor omission of encryption details."
}
`.trim();

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-3-mini",  // Updated: Cheap/fast model for grading (or use "grok-3" for better accuracy)
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 150,  // Limit response length for cost/speed
      }),
    });

    // Log full error for debugging (check Vercel logs: dashboard > Functions > Logs)
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Grok API Error:", res.status, errorText);
      return NextResponse.json(
        { 
          score: 0, 
          feedback: `AI service error (Status: ${res.status}). Check logs for details.` 
        },
        { status: 500 }
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "";

    try {
      // Improved parsing: Extract JSON if wrapped in markdown
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      const parsed = JSON.parse(jsonString);
      return NextResponse.json({
        score: Math.max(0, Math.min(10, Number(parsed.score) || 0)),  // Clamp 0-10
        feedback: (parsed.feedback || "Graded by AI.").substring(0, 200),  // Limit length
      });
    } catch (parseError) {
      console.error("JSON Parse Error:", content, parseError);
      return NextResponse.json({ 
        score: Math.min(10, Math.ceil(userAnswer.length / 10)),  // Fallback: Basic length-based score (max 10)
        feedback: "AI response invalid; fallback grading applied." 
      });
    }
  } catch (error) {
    console.error("Grading error:", error);
    return NextResponse.json(
      { score: 0, feedback: "Server error during grading." },
      { status: 500 }
    );
  }
}