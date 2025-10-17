// app/(site)/api/career/write/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim() || "Not provided";
    const experience = formData.get('experience')?.toString().trim();
    const portfolioFile = formData.get('portfolio') as File | null;

    if (!name || !email || !experience || !portfolioFile || portfolioFile.size === 0) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, experience, and portfolio are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    const allowedTypes = [
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif'
    ];
    const maxFileSize = 10 * 1024 * 1024;

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

    const buffer = Buffer.from(await portfolioFile.arrayBuffer());
    const portfolioFileName = portfolioFile.name || `portfolio-${Date.now()}.pdf`;

    // Immediate response to frontend
    const response = NextResponse.json(
      { message: "Writer application submitted successfully! Check your email for confirmation." },
      { status: 200 }
    );

    // Async email sending
    (async () => {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          tls: { rejectUnauthorized: false },
        });

        if (process.env.NODE_ENV !== "development") {
          await transporter.verify();
        }

        const verifiedSender = "info@ostutelage.tech";

        const escapeHtml = (unsafe?: string) => {
          if (typeof unsafe !== 'string') return '';
          return unsafe.replace(/[&<>"']/g, (m) =>
            ({ '&': '&', '<': '<', '>': '>', '"': '"', "'": "'" }[m] || m)
          );
        };

        // Admin email
        await transporter.sendMail({
          from: `"OsTutelage Careers" <${verifiedSender}>`,
          to: "info@ostutelage.tech",
          replyTo: email,
          subject: `New Writer Application: ${escapeHtml(name)}`,
          headers: { "X-Mailin": "spf@brevo.com" },
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
              <h2>New Writer Application</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
              <p><strong>Experience:</strong> ${escapeHtml(experience).replace(/\n/g,'<br>')}</p>
              <p><strong>Portfolio:</strong> ${escapeHtml(portfolioFileName)} (${portfolioFile.type}, ${(portfolioFile.size/1024/1024).toFixed(2)} MB)</p>
              <p>Application received: ${new Date().toLocaleString()}</p>
            </div>
          `,
          attachments: [{ filename: portfolioFileName, content: buffer, contentType: portfolioFile.type }],
        });

        // Applicant auto-reply
        await transporter.sendMail({
          from: `"OsTutelage Academy" <${verifiedSender}>`,
          to: email,
          subject: `Thank You for Your Writer Application, ${name}!`,
          headers: { "X-Mailin": "spf@brevo.com" },
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
              <h1>Hello, ${escapeHtml(name)}!</h1>
              <p>Your Writer Application has been received and is under review.</p>
              <p>Our editorial team will respond within 3-5 business days.</p>
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
    console.error("Writer Application Error:", error);
    return NextResponse.json(
      {
        message: "Failed to process application. Try again or email info@ostutelage.tech",
        ...(process.env.NODE_ENV === 'development' && { error: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    );
  }
}
