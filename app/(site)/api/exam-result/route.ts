// app/api/exam-result/route.ts
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
      scholarship,
      mcqCorrect,
      mcqMarks,
      shortMarks,
      shortAnswers,
      timestamp,
    } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // === ADMIN NOTIFICATION EMAIL ===
    await transporter.sendMail({
      from: `"OsTutelage Bot" <no-reply@ostutelage.tech>`,
      to: "info@ostutelage.tech",
      subject: `New Result: ${name} – ${score}% → ${scholarship}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 20px auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #059669; margin-top: 0;">New Scholarship Exam Submission</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>School:</strong> ${school}</p>
            <hr style="margin: 16px 0; border: 1px dashed #ddd;">
            <p><strong>Total Score:</strong> <span style="font-size: 1.4em; color: #059669;">${score}%</span></p>
            <p><strong>MCQ:</strong> ${mcqCorrect}/45 → <strong>${mcqMarks}/80</strong> marks</p>
            <p><strong>Short Answers:</strong> ${shortMarks}/20 marks</p>
            <p><strong>Scholarship Earned:</strong> <span style="color: #059669; font-weight: bold;">${scholarship}</span></p>
            <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString("en-IN")}</p>
          </div>
        </div>
      `,
    });

    // === STUDENT RESULT EMAIL (Beautiful & High-Converting) ===
    await transporter.sendMail({
      from: `"OsTutelage Academy" <info@ostutelage.tech>`,
      to: email,
      subject: `Congratulations ${name.split(" ")[0]}! You've Won ${scholarship} 🎉`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Your OsTutelage Scholarship Result</title>
        </head>
        <body style="margin:0; padding:0; background:#f8fafc; font-family:system-ui,Arial,sans-serif;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; color: white;">
              <h1 style="margin:0; font-size: 32px; font-weight: 800;">Congratulations, ${name.split(" ")[0]}!</h1>
              <p style="margin: 12px 0 0; font-size: 18px; opacity: 0.95;">You’ve successfully completed the OsTutelage Scholarship Exam</p>
            </div>

            <!-- Score Badge -->
            <div style="text-align: center; padding: 30px 20px 20px;">
              <div style="display: inline-block; background: #ecfdf5; padding: 20px 40px; border-radius: 20px; border: 4px solid #10b981;">
                <div style="font-size: 64px; font-weight: 900; color: #059669; line-height: 1;">${score}%</div>
                <div style="font-size: 18px; color: #065f46; margin-top: 8px;">Your Final Score</div>
              </div>
            </div>

            <!-- Scholarship Award -->
            <div style="text-align: center; padding: 0 30px;">
              <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 24px; border-radius: 16px; margin: 20px 0;">
                <h2 style="margin:0 0 12px; color: #166534; font-size: 28px;">
                  ${scholarship === "Try Again" ? "Great Effort!" : `You’ve Won ${scholarship}!`}
                </h2>
                ${scholarship !== "Try Again" ? `
                  <p style="margin:0; font-size: 18px; color: #166534;">
                    This scholarship is reserved for you at <strong>${school}</strong>
                  </p>
                ` : `
                  <p style="margin:0; font-size: 17px; color: #166534;">
                    Keep practicing — you're very close to a scholarship!
                  </p>
                `}
              </div>
            </div>

            <!-- Score Breakdown -->
            <div style="padding: 30px; background: #f8fafc;">
              <h3 style="text-align: center; color: #374151; margin-bottom: 20px;">Score Breakdown</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 400px; margin: 0 auto;">
                <div style="background: white; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  <div style="font-size: 13px; color: #6b7280;">MCQ Section</div>
                  <div style="font-size: 24px; font-weight: bold; color: #059669;">${mcqCorrect}/45</div>
                  <div style="font-size: 14px; color: #4b5563;">${mcqMarks}/80 marks</div>
                </div>
                <div style="background: white; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  <div style="font-size: 13px; color: #6b7280;">Short Answers</div>
                  <div style="font-size: 24px; font-weight: bold; color: #0891b2;">${shortMarks}/20</div>
                  <div style="font-size: 14px; color: #4b5563;">AI Graded</div>
                </div>
              </div>
            </div>

            <!-- CTA Button -->
            ${score >= 48 ? `
              <div style="text-align: center; padding: 30px;">
                <a href="https://app.ostutelage.tech/portal/signup.php?promo=2025OS&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&score=${score}"
                   style="background: #059669; color: white; padding: 16px 40px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);">
                  Claim Your Scholarship Now →
                </a>
                <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px;">
                  Offer valid for the next 7 days only!
                </p>
              </div>
            ` : `
              <div style="text-align: center; padding: 30px;">
                <a href="https://ostutelage.tech/practice-tests" style="background: #6366f1; color: white; padding: 16px 40px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 12px; display: inline-block;">
                  Practice More & Win Next Time →
                </a>
              </div>
            `}

            <!-- Footer -->
            <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; font-size: 14px;">
              <p style="margin: 0 0 12px;"><strong>OsTutelage Academy</strong></p>
              <p style="margin: 0;">
                Transforming education with expert mentorship<br>
                <a href="https://ostutelage.tech" style="color: #60a5fa; text-decoration: none;">ostutelage.tech</a> • 
                <a href="mailto:info@ostutelage.tech" style="color: #60a5fa;">info@ostutelage.tech</a>
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