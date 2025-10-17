// app/(site)/api/career/apply/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // -------------------------------
    // 1. Parse multipart form data
    // -------------------------------
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim() || "Not provided";
    const role = formData.get("role")?.toString().trim() || "General Application";
    const experience = formData.get("experience")?.toString().trim();
    const coverLetter = formData.get("coverLetter")?.toString().trim() || "Not provided";
    const resumeFile = formData.get("resume") as File | null;

    // -------------------------------
    // 2. Validate required fields
    // -------------------------------
    if (!name || !email || !resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, and resume are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Resume validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { message: "Please upload a PDF or Word document (.doc, .docx) for your resume" },
        { status: 400 }
      );
    }
    if (resumeFile.size > maxFileSize) {
      return NextResponse.json(
        { message: "Resume file too large. Please upload a file smaller than 5MB" },
        { status: 400 }
      );
    }

    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const resumeFileName = resumeFile.name || `resume-${Date.now()}.pdf`;

    const isFaculty = !!experience;
    const applicationType = isFaculty ? "Faculty" : role;

    // -------------------------------
    // 3. Respond immediately to frontend
    // -------------------------------
    const response = NextResponse.json({
      message: `Your ${applicationType} application has been submitted successfully! Check your email for confirmation.`,
    }, { status: 200 });

    // -------------------------------
    // 4. Send emails in the background
    // -------------------------------
    (async () => {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: { rejectUnauthorized: false },
        });

        if (process.env.NODE_ENV !== "development") {
          await transporter.verify();
          console.log("SMTP verified for career application");
        }

        const verifiedSender = "info@ostutelage.tech";

        const escapeHtml = (unsafe?: string) => {
          if (typeof unsafe !== "string") return "";
          return unsafe.replace(/[&<>"']/g, (m) =>
            ({ "&": "&", "<": "<", ">": ">", '"': '"', "'": "'" }[m] || m)
          );
        };

        // Admin email
        await transporter.sendMail({
          from: `"OsTutelage Careers" <${verifiedSender}>`,
          to: "info@ostutelage.tech",
          replyTo: email,
          subject: `New ${applicationType} Application: ${name}`,
          headers: { "X-Mailin": "spf@brevo.com" },
          html: `
            <div style="font-family: Arial, sans-serif; max-width:600px;margin:0 auto;padding:20px;background:#f9fafb;">
              <h2>New ${applicationType} Application</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
              ${isFaculty ? `<p><strong>Experience:</strong> ${escapeHtml(experience)}</p>` : `<p><strong>Role:</strong> ${escapeHtml(role)}</p>`}
              ${coverLetter && coverLetter !== "Not provided" ? `<p><strong>Cover Letter:</strong> ${escapeHtml(coverLetter)}</p>` : ""}
              <p><strong>Resume:</strong> ${escapeHtml(resumeFileName)} (${resumeFile.type}, ${(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</p>
              <p>Application received: ${new Date().toLocaleString()}</p>
            </div>
          `,
          attachments: [
            { filename: resumeFileName, content: resumeBuffer, contentType: resumeFile.type },
          ],
        });

        // Applicant auto-reply
        await transporter.sendMail({
          from: `"OsTutelage Academy" <${verifiedSender}>`,
          to: email,
          subject: `Thank you for your ${applicationType} application, ${name}!`,
          headers: { "X-Mailin": "spf@brevo.com" },
          html: `
            <div style="font-family: Arial, sans-serif; max-width:600px;margin:0 auto;padding:20px;background:#f8fafc;">
              <h1>Hello, ${escapeHtml(name)}!</h1>
              <p>Your ${applicationType} application has been received and is under review.</p>
              ${isFaculty ? `<p>We are excited about your teaching experience and will review it carefully.</p>` : ""}
              <p>Thank you for applying to OsTutelage Academy.</p>
            </div>
          `,
        });
      } catch (err) {
        console.error("Background email sending failed:", err);
      }
    })();

    return response;

  } catch (error: any) {
    console.error("Career Application Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        message: "Failed to process application. Please try again or email us at info@ostutelage.tech",
        ...(process.env.NODE_ENV === "development" && { error: error instanceof Error ? error.message : String(error) }),
      },
      { status: 500 }
    );
  }
}
