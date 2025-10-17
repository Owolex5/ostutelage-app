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
        { 
          message: "Missing required fields: name, email, and resume are required",
          error: true 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          message: "Invalid email format",
          error: true 
        }, 
        { status: 400 }
      );
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
        { 
          message: "Please upload a PDF or Word document (.doc, .docx) for your resume",
          error: true 
        },
        { status: 400 }
      );
    }
    if (resumeFile.size > maxFileSize) {
      return NextResponse.json(
        { 
          message: "Resume file too large. Please upload a file smaller than 5MB",
          error: true 
        },
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
    // 4. Configure Nodemailer - FIXED: createTransport, not createTransporter
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
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m] || m)
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

    // -------------------------------
    // 7. Return SUCCESS response explicitly
    // -------------------------------
    return NextResponse.json(
      {
        message: `${applicationType} application submitted successfully! We'll review your submission and get back to you within 3-5 business days.`,
        success: true,
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  } catch (error: any) {
    console.error("Career Application Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    if (error.code === "EAUTH") {
      return NextResponse.json(
        { 
          message: "Email service temporarily unavailable. Please try again later or email us directly at info@ostutelage.tech",
          error: true 
        },
        { status: 503 }
      );
    }

    if (error.code?.startsWith("E") || error.message?.includes("connect") || error.message?.includes("timeout")) {
      return NextResponse.json(
        { 
          message: "Email service temporarily unavailable. Please try again later or email us directly at info@ostutelage.tech",
          error: true 
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to process application. Please try again or email us directly at info@ostutelage.tech",
        error: true,
        ...(process.env.NODE_ENV === "development" && {
          debug: error.message,
        }),
      },
      { status: 500 }
    );
  }
}

// Helper functions remain the same
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
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m] || m)
    );
  };

  const isFaculty = !!experience;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
      <h2 style="color: #059669;">New ${escapeHtml(applicationType)} Application</h2>
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${isFaculty ? `<p><strong>Experience:</strong><br>${escapeHtml(experience)}</p>` : `<p><strong>Role:</strong> ${escapeHtml(role)}</p>`}
        ${coverLetter && coverLetter !== "Not provided" ? `<p><strong>Cover Letter:</strong><br>${escapeHtml(coverLetter)}</p>` : ""}
        <p><strong>Resume:</strong> ${escapeHtml(resumeFileName)} (${resumeFileType}, ${resumeFileSizeMB} MB)</p>
        <p><em>Received: ${new Date().toLocaleString()}</em></p>
      </div>
      <p>Please review this application and respond within 3-5 business days.</p>
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
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m] || m)
    );
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e5e7eb;">
      <h1 style="color: #059669;">Thank You for Applying, ${escapeHtml(name)}!</h1>
      <p>Your <strong>${escapeHtml(applicationType)}</strong> application has been successfully received and is now under review by our team.</p>
      ${isFaculty ? `<p style="background: #ecfdf5; padding: 10px; border-radius: 5px; border-left: 4px solid #10b981;">We're particularly excited about your teaching experience and will review your qualifications carefully.</p>` : ""}
      <p>Our hiring team will review your application and get back to you within <strong>3-5 business days</strong>.</p>
      <p>Thank you for your interest in joining <strong>OsTutelage Academy</strong>!</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="font-size: 12px; color: #6b7280;">If you have any questions, please email us at <a href="mailto:info@ostutelage.tech" style="color: #059669;">info@ostutelage.tech</a></p>
    </div>
  `;
}