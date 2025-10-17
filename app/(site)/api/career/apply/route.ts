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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Validate resume file type and size
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

    // -------------------------------
    // 3. Determine application type
    // -------------------------------
    const isFaculty = !!experience;
    const applicationType = isFaculty ? "Faculty" : role;
    const subject = `New ${applicationType} Application: ${name}`;

    // -------------------------------
    // 4. Configure Nodemailer
    // -------------------------------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      pool: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });

    if (process.env.NODE_ENV !== "development") {
      await transporter.verify();
      console.log("SMTP connection verified for career application");
    }

    const verifiedSender = "info@ostutelage.tech";

    const escapeHtml = (unsafe?: string): string => {
      if (typeof unsafe !== "string") return "";
      return unsafe.replace(/[&<>"']/g, (m) =>
        ({ "&": "&", "<": "<", ">": ">", '"': '"', "'": "'" }[m] || m)
      );
    };

    // -------------------------------
    // 5. Send admin notification email
    // -------------------------------
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${verifiedSender}>`,
      to: "info@ostutelage.tech",
      replyTo: email,
      subject,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: buildAdminEmailHtml({
        name,
        email,
        phone,
        applicationType,
        role,
        experience,
        coverLetter,
        resumeFileName,
        resumeFileType: resumeFile.type,
        resumeFileSizeMB: (resumeFile.size / 1024 / 1024).toFixed(2),
      }),
      attachments: [
        {
          filename: resumeFileName,
          content: resumeBuffer,
          contentType: resumeFile.type,
        },
      ],
    });

    // -------------------------------
    // 6. Send applicant auto-reply
    // -------------------------------
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`,
      to: email,
      subject: `Thank You for Your ${applicationType} Application, ${name}!`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: buildApplicantEmailHtml({ name, applicationType, isFaculty }),
    });

    return NextResponse.json(
      {
        message: `Your ${applicationType} application has been submitted successfully! Check your email for confirmation.`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Career Application Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    if (error.code === "EAUTH") {
      return NextResponse.json(
        { message: "Email service authentication failed. Please try again later." },
        { status: 503 }
      );
    }

    if (error.code?.startsWith("E")) {
      return NextResponse.json(
        { message: "Email sending failed. Please try again or contact us directly." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to process application. Please try again or email us at info@ostutelage.tech",
        ...(process.env.NODE_ENV === "development" && {
          error: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}

// -------------------------------
// Helper Functions
// -------------------------------
function buildAdminEmailHtml({
  name,
  email,
  phone,
  applicationType,
  role,
  experience,
  coverLetter,
  resumeFileName,
  resumeFileType,
  resumeFileSizeMB,
}: {
  name: string;
  email: string;
  phone: string;
  applicationType: string;
  role: string;
  experience?: string;
  coverLetter?: string;
  resumeFileName: string;
  resumeFileType: string;
  resumeFileSizeMB: string;
}) {
  const escapeHtml = (unsafe?: string): string => {
    if (typeof unsafe !== "string") return "";
    return unsafe.replace(/[&<>"']/g, (m) =>
      ({ "&": "&", "<": "<", ">": ">", '"': '"', "'": "'" }[m] || m)
    );
  };

  const isFaculty = !!experience;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <h2>New ${applicationType} Application</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      ${isFaculty ? `<p><strong>Experience:</strong> ${escapeHtml(experience)}</p>` : `<p><strong>Role:</strong> ${escapeHtml(role)}</p>`}
      ${coverLetter && coverLetter !== "Not provided" ? `<p><strong>Cover Letter:</strong> ${escapeHtml(coverLetter)}</p>` : ""}
      <p><strong>Resume:</strong> ${escapeHtml(resumeFileName)} (${resumeFileType}, ${resumeFileSizeMB} MB)</p>
      <p>Application received: ${new Date().toLocaleString()}</p>
    </div>
  `;
}

function buildApplicantEmailHtml({
  name,
  applicationType,
  isFaculty,
}: {
  name: string;
  applicationType: string;
  isFaculty: boolean;
}) {
  const escapeHtml = (unsafe?: string): string => {
    if (typeof unsafe !== "string") return "";
    return unsafe.replace(/[&<>"']/g, (m) =>
      ({ "&": "&", "<": "<", ">": ">", '"': '"', "'": "'" }[m] || m)
    );
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <h1>Welcome, ${escapeHtml(name)}!</h1>
      <p>Your ${applicationType} application has been received and is under review.</p>
      ${isFaculty ? `<p>We are excited about your teaching experience and will review it carefully.</p>` : ""}
      <p>Thank you for applying to OsTutelage Academy.</p>
    </div>
  `;
}
