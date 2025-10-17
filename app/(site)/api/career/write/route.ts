import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Extract and sanitize fields
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim() || "Not provided";
    const experience = formData.get('experience')?.toString().trim();
    const portfolioFile = formData.get('portfolio') as File | null;

    // Validate required fields
    if (!name || !email || !experience || !portfolioFile || portfolioFile.size === 0) {
      return NextResponse.json(
        { 
          message: "Missing required fields: name, email, experience, and portfolio are required",
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

    // Validate portfolio file
    const allowedTypes = [
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif'
    ];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(portfolioFile.type)) {
      return NextResponse.json(
        { 
          message: "Upload a PDF, Word, PowerPoint, or image (JPEG, PNG, GIF) for your portfolio",
          error: true 
        },
        { status: 400 }
      );
    }

    if (portfolioFile.size > maxFileSize) {
      return NextResponse.json(
        { 
          message: "File too large. Upload a file smaller than 10MB",
          error: true 
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await portfolioFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const portfolioFileName = portfolioFile.name || `portfolio-${Date.now()}.pdf`;

    // Configure Nodemailer transporter
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
      console.log("SMTP connection verified for writer application");
    }

    const verifiedSender = "info@ostutelage.tech";

    // Fixed HTML escaping utility
    const escapeHtml = (unsafe?: string): string => {
      if (typeof unsafe !== 'string') return '';
      return unsafe.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }[m] || m));
    };

    // Email to OsTutelage with attachment
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${verifiedSender}>`,
      to: "info@ostutelage.tech",
      replyTo: email,
      subject: `New Writer Application: ${escapeHtml(name)}`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: buildAdminEmailHtml({
        name,
        email,
        phone,
        experience,
        portfolioFileName,
        portfolioFileType: portfolioFile.type,
        portfolioFileSizeMB: (portfolioFile.size / 1024 / 1024).toFixed(2),
      }),
      attachments: [{ 
        filename: portfolioFileName, 
        content: buffer, 
        contentType: portfolioFile.type 
      }],
    });

    // Auto-reply to applicant
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`,
      to: email,
      subject: `Thank You for Your Writer Application, ${name}!`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: buildApplicantEmailHtml({ name }),
    });

    // Explicit success response
    return NextResponse.json(
      { 
        message: "Writer application submitted successfully! Check your email for confirmation.",
        success: true 
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  } catch (error: any) {
    console.error("Writer Application Error:", { 
      message: error.message, 
      code: error.code, 
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    if (error.code === "EAUTH") {
      return NextResponse.json(
        { 
          message: "Email service temporarily unavailable. Please try again later or email info@ostutelage.tech",
          error: true 
        }, 
        { status: 503 }
      );
    }

    if (error.code?.startsWith('E') || error.message?.includes("connect") || error.message?.includes("timeout")) {
      return NextResponse.json(
        { 
          message: "Email service temporarily unavailable. Please try again later or email info@ostutelage.tech",
          error: true 
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        message: "Failed to process writer application. Please try again or email info@ostutelage.tech",
        error: true,
        ...(process.env.NODE_ENV === 'development' && { 
          debug: error instanceof Error ? error.message : String(error) 
        })
      },
      { status: 500 }
    );
  }
}

// Helper functions with proper HTML escaping
function buildAdminEmailHtml({
  name,
  email,
  phone,
  experience,
  portfolioFileName,
  portfolioFileType,
  portfolioFileSizeMB,
}: {
  name: string;
  email: string;
  phone: string;
  experience: string;
  portfolioFileName: string;
  portfolioFileType: string;
  portfolioFileSizeMB: string;
}) {
  const escapeHtml = (unsafe?: string): string => {
    if (typeof unsafe !== 'string') return '';
    return unsafe.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }[m] || m));
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
      <h2 style="color: #8b5cf6;">New Writer Application</h2>
      <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Writing Experience:</strong><br>${escapeHtml(experience).replace(/\n/g, '<br>')}</p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6; margin-top: 15px;">
          <strong>Portfolio Attached:</strong> ${escapeHtml(portfolioFileName)}<br>
          <small>Type: ${escapeHtml(portfolioFileType)} | Size: ${escapeHtml(portfolioFileSizeMB)} MB</small>
        </div>
      </div>
      <p style="color: #6b7280; font-size: 14px;">
        <em>Application received: ${new Date().toLocaleString()}</em><br>
        Please review this writer's portfolio and respond within 3-5 business days.
      </p>
    </div>
  `;
}

function buildApplicantEmailHtml({ name }: { name: string }) {
  const escapeHtml = (unsafe?: string): string => {
    if (typeof unsafe !== 'string') return '';
    return unsafe.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }[m] || m));
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e5e7eb;">
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); border-radius: 8px; color: white;">
        <h1>Thank You, ${escapeHtml(name)}!</h1>
        <p>Your Writer Application Has Been Received</p>
      </div>
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937;">What's Next?</h2>
        <p>Our editorial team is reviewing your application and portfolio. Expect a response within <strong>3-5 business days</strong>.</p>
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3>What We Review</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Writing samples and portfolio quality</li>
            <li>Relevance to tech education topics</li>
            <li>Writing style, clarity, and engagement</li>
            <li>Consistency with OsTutelage standards</li>
          </ul>
        </div>
        <p>Feel free to <a href="https://ostutelage.tech" style="color: #8b5cf6;">explore our platform</a> while you wait.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          If you have questions, email us at <a href="mailto:info@ostutelage.tech" style="color: #8b5cf6;">info@ostutelage.tech</a>
        </p>
      </div>
    </div>
  `;
}