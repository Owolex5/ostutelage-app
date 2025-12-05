// app/api/exam-result/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, school, score, scholarship, correctAnswers, totalQuestions } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // === ADMIN EMAIL ===
    await transporter.sendMail({
      from: `"OsTutelage Exams" <info@ostutelage.tech>`,
      to: "info@ostutelage.tech",
      subject: `Scholarship Exam: ${name} – ${score}% (${scholarship})`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #059669;">New Scholarship Exam Result</h2>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>School:</strong> ${school}</p>
          <p><strong>Score:</strong> ${correctAnswers}/${totalQuestions} (${score}%)</p>
          <p><strong>Scholarship:</strong> <strong style="color: #059669;">${scholarship}</strong></p>
          <hr>
          <small>${new Date().toLocaleString()}</small>
        </div>
      `
    });

    // === USER EMAIL ===
    await transporter.sendMail({
      from: `"OsTutelage Academy" <info@ostutelage.tech>`,
      to: email,
      subject: `Your Scholarship: ${scholarship}!`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h1 style="color: #059669;">Congratulations, ${name}!</h1>
          <p>You scored <strong>${score}%</strong> in the OsTutelage Scholarship Exam.</p>
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 5px solid #10b981;">
            <p style="margin:0; font-size:18px;"><strong>${scholarship}</strong></p>
            <p style="margin:5px 0 0;">Valid for: <strong>${school}</strong></p>
          </div>
          <p><a href="https://app.ostutelage.tech/portal/signup.php" style="background:#059669;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;">
            Apply Now & Claim Scholarship
          </a></p>
          <p>Team OsTutelage</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Exam result email failed:", error);
    return NextResponse.json({ error: "Failed to send result" }, { status: 500 });
  }
}