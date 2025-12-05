// app/(site)/api/exam-result/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      school,
      score,
      scholarship,           // e.g. "Diamond Elite Scholarship"
      promoCode,             // ← comes from frontend (e.g. "SCHOLAR15")
      discountPercent,       // ← comes from frontend (68, 57, 47…)
      badgeColor = "#10b981", // fallback color
      mcqCorrect,
      mcqMarks,
      shortMarks,
      timestamp,
    } = body;

    // Safety fallbacks (should never trigger)
    const finalDiscount = discountPercent ?? 10;
    const finalPromoCode = promoCode ?? "LEARN10";
    const finalBadgeColor = badgeColor ?? "#10b981";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ==================== ADMIN EMAIL ====================
    await transporter.sendMail({
      from: `"OsTutelage Bot" <no-reply@ostutelage.tech>`,
      to: "info@ostutelage.tech",
      subject: `New Result: ${name} – ${score}% → ${scholarship}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:20px auto;padding:24px;background:#f9fafb;border-radius:12px;">
          <h2 style="color:#059669;margin-top:0;">New Scholarship Exam Submission</h2>
          <div style="background:white;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>School:</strong> ${school}</p>
            <hr style="margin:16px 0;border:1px dashed #ddd;">
            <p><strong>Total Score:</strong> <span style="font-size:1.4em;color:#059669;">${score}%</span></p>
            <p><strong>MCQ:</strong> ${mcqCorrect}/45 → <strong>${mcqMarks}/70</strong> marks</p>
            <p><strong>Short Answers:</strong> ${shortMarks}/30 marks</p>
            <p><strong>Scholarship:</strong> <strong style="color:#059669;">${scholarship}</strong></p>
            <p><strong>Promo Code:</strong> <code style="background:#f3f4f6;padding:4px 8px;border-radius:6px;font-weight:bold;">${finalPromoCode}</code></p>
            <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString("en-IN")}</p>
          </div>
        </div>
      `,
    });

    // ==================== STUDENT EMAIL (FINAL BEAUTIFUL VERSION) ====================
    await transporter.sendMail({
      from: `"OsTutelage Academy" <hello@ostutelage.tech>`,
      to: email,
      subject: `Congrats ${name.split(" ")[0]}! You Won ${finalDiscount}% Scholarship (${finalPromoCode})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Your OsTutelage Scholarship</title>
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,Arial,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:40px 30px;text-align:center;color:white;">
              <h1 style="margin:0;font-size:36px;font-weight:900;">CONGRATULATIONS ${name.split(" ")[0].toUpperCase()}!</h1>
              <p style="margin:12px 0 0;font-size:19px;opacity:0.95;">You’ve earned a massive scholarship!</p>
            </div>

            <!-- Score -->
            <div style="text-align:center;padding:30px 20px;">
              <div style="display:inline-block;background:#ecfdf5;padding:24px 48px;border-radius:24px;border:5px solid #10b981;">
                <div style="font-size:72px;font-weight:900;color:#059669;line-height:1;">${score}</div>
                <div style="font-size:20px;color:#065f46;margin-top:8px;">Your Final Score</div>
              </div>
            </div>

            <!-- Scholarship Badge -->
            <div style="text-align:center;padding:0 30px 20px;">
              <div style="background:${finalBadgeColor};color:white;padding:20px;border-radius:20px;display:inline-block;font-size:28px;font-weight:bold;box-shadow:0 10px 30px rgba(0,0,0,0.2);">
                ${scholarship}
              </div>
              <p style="font-size:32px;font-weight:bold;color:#059669;margin:16px 0 8px;">
                ${finalDiscount}% Scholarship Unlocked!
              </p>
            </div>

            <!-- PROMO CODE — IMPOSSIBLE TO MISS -->
            <div style="background:#fffbeb;border:3px dashed #f59e0b;padding:20px;margin:20px 40px;border-radius:16px;text-align:center;">
              <p style="margin:0 0 12px;font-size:16px;color:#92400e;">Your Exclusive Scholarship Code</p>
              <div style="background:#fbbf24;color:#451a03;padding:16px;border-radius:12px;font-size:32px;font-weight:900;letter-spacing:4px;">
                ${finalPromoCode}
              </div>
              <p style="margin:12px 0 0;font-size:14px;color:#92400e;">
                Use this code at checkout → ${finalDiscount}% OFF instantly!
              </p>
            </div>

            <!-- Score Breakdown -->
            <div style="padding:30px;background:#f8fafc;">
              <h3 style="text-align:center;color:#374151;margin-bottom:20px;">Your Performance</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:420px;margin:0 auto;">
                <div style="background:white;padding:18px;border-radius:14px;text-align:center;box-shadow:0 4px 15px rgba(0,0,0,0.06);">
                  <div style="font-size:14px;color:#6b7280;">MCQs</div>
                  <div style="font-size:28px;font-weight:bold;color:#059669;">${mcqCorrect}/45</div>
                  <div style="font-size:15px;color:#4b5563;">${mcqMarks}/70 marks</div>
                </div>
                <div style="background:white;padding:18px;border-radius:14px;text-align:center;box-shadow:0 4px 15px rgba(0,0,0,0.06);">
                  <div style="font-size:14px;color:#6b7280;">Short Answers</div>
                  <div style="font-size:28px;font-weight:bold;color:#0891b2;">${shortMarks}/30</div>
                  <div style="font-size:15px;color:#4b5563;">AI Graded</div>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div style="text-align:center;padding:40px;background:white;">
              <p style="font-size:20px;margin-bottom:20px;color:#1f2937;">
                <strong>Claim your scholarship in 1 click!</strong>
              </p>
              <a href="https://app.ostutelage.tech/portal/signup.php?promo=${finalPromoCode}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&score=${score}"
                 style="background:#059669;color:white;padding:18px 48px;font-size:20px;font-weight:bold;text-decoration:none;border-radius:16px;display:inline-block;margin:10px;box-shadow:0 10px 30px rgba(5,150,105,0.4);">
                Apply Now with Code ${finalPromoCode} →
              </a>
              <p style="margin:30px 0 10px;color:#6b7280;">
                Or visit <a href="https://app.ostutelage.tech/portal/signup.php" style="color:#059669;font-weight:bold;">signup page</a> and enter the code manually
              </p>
              <p style="color:#dc2626;font-weight:bold;font-size:16px;">
                Offer expires in 7 days!
              </p>
            </div>

            <!-- Footer -->
            <div style="background:#0f172a;color:#94a3b8;padding:30px;text-align:center;font-size:14px;">
              <p style="margin:0 0 12px;"><strong>OsTutelage Academy</strong></p>
              <p style="margin:0;">
                India’s fastest-growing tech mentorship program<br>
                <a href="https://ostutelage.tech" style="color:#60a5fa;">ostutelage.tech</a> • 
                <a href="mailto:hello@ostutelage.tech" style="color:#60a5fa;">hello@ostutelage.tech</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Exam result email failed:", error);
    return NextResponse.json(
      { error: "Failed to send result email", details: error.message },
      { status: 500 }
    );
  }
}