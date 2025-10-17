// app/(site)/api/career/write/route.ts
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
        { message: "Missing required fields: name, email, experience, and portfolio are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
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
        { message: "Upload a PDF, Word, PowerPoint, or image (JPEG, PNG, GIF) for your portfolio" },
        { status: 400 }
      );
    }

    if (portfolioFile.size > maxFileSize) {
      return NextResponse.json(
        { message: "File too large. Upload a file smaller than 10MB" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await portfolioFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const portfolioFileName = portfolioFile.name || `portfolio-${Date.now()}.pdf`;

    // Nodemailer transporter
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

    // Escape HTML utility
    const escapeHtml = (unsafe?: string) => {
      if (typeof unsafe !== 'string') return '';
      return unsafe.replace(/[&<>"']/g, (m) => ({
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": "'",
      }[m] || m));
    };

    // Email to OsTutelage with attachment
    await transporter.sendMail({
      from: `"OsTutelage Careers" <${verifiedSender}>`,
      to: "info@ostutelage.tech",
      replyTo: email,
      subject: `New Writer Application: ${escapeHtml(name)}`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">New Writer Application</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Writing Experience:</strong> ${escapeHtml(experience).replace(/\n/g, '<br>')}</p>
            <div style="background: #e5e7eb; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              <strong>Portfolio Attached:</strong> ${escapeHtml(portfolioFileName)}
              <small>Type: ${escapeHtml(portfolioFile.type)} | Size: ${(portfolioFile.size / 1024 / 1024).toFixed(2)} MB</small>
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            <em>Application received: ${new Date().toLocaleString()}</em><br>
            Sent from OsTutelage Academy Careers Portal
          </p>
        </div>
      `,
      attachments: [{ filename: portfolioFileName, content: buffer, contentType: portfolioFile.type }],
    });

    // Auto-reply to applicant
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`,
      to: email,
      subject: `Thank You for Your Writer Application, ${name}!`,
      headers: { "X-Mailin": "spf@brevo.com" },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
            <h1>Thank You, ${escapeHtml(name)}!</h1>
            <p>Your Writer Application Has Been Received</p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h2>What's Next?</h2>
            <p>Our editorial team is reviewing your application and portfolio. Expect a response within <strong>3-5 business days</strong>.</p>
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <h3>What We Review</h3>
              <ul>
                <li>Writing samples and portfolio quality</li>
                <li>Relevance to tech education topics</li>
                <li>Writing style, clarity, engagement</li>
                <li>Consistency with OsTutelage standards</li>
              </ul>
            </div>
            <p>Feel free to <a href="https://ostutelage.tech" style="color: #3b82f6;">explore our platform</a> or check our <a href="https://ostutelage.tech/schools" style="color: #3b82f6;">current programs</a>.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Writer application sent successfully! Check your email for confirmation." },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Career Application Error:", { message: error.message, code: error.code, stack: error.stack });

    if (error.code === "EAUTH") {
      return NextResponse.json({ message: "Email authentication failed. Try again later." }, { status: 503 });
    }

    if (error.code?.startsWith('E')) {
      return NextResponse.json({ message: "Email sending failed. Contact us directly." }, { status: 503 });
    }

    return NextResponse.json(
      { 
        message: "Failed to process application. Please try again or email info@ostutelage.tech",
        ...(process.env.NODE_ENV === 'development' && { error: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    );
  }
}
