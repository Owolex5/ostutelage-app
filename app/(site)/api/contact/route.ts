import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, whatsapp, phone } = body;

    // Validate required fields with TypeScript safety
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Type assertion for validated fields (they're guaranteed to be strings now)
    const validatedName = name as string;
    const validatedEmail = email as string;
    const validatedSubject = subject as string;
    const validatedMessage = message as string;
    const validatedWhatsapp = whatsapp as string | undefined;
    const validatedPhone = phone as string | undefined;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      pool: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      debug: process.env.NODE_ENV === "development",
      logger: process.env.NODE_ENV === "development",
    });

    // Verify connection (skip in dev)
    if (process.env.NODE_ENV !== "development") {
      await transporter.verify();
      console.log("Brevo SMTP connection verified");
    }

    const verifiedSender = "info@ostutelage.tech";

    // FIXED: Safe escapeHtml function with proper typing
    const escapeHtml = (unsafe?: string): string => {
      if (!unsafe) return '';
      return unsafe.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[m] || m));
    };

    // Email to OsTutelage
    await transporter.sendMail({
      from: `"OsTutelage Contact" <${verifiedSender}>`,
      to: "info@ostutelage.tech",
      replyTo: validatedEmail,
      subject: `New Contact Form Submission: ${escapeHtml(validatedSubject)}`,
      headers: {
        "X-Mailin": "spf@brevo.com",
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(validatedName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(validatedEmail)}">${escapeHtml(validatedEmail)}</a></p>
            <p><strong>Phone:</strong> ${escapeHtml(validatedPhone)}</p>
            <p><strong>WhatsApp:</strong> ${escapeHtml(validatedWhatsapp)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(validatedSubject)}</p>
            <p><strong>Message:</strong><br>${validatedMessage.replace(/\n/g, '<br>')}</p>
            <p><em>Submitted: ${new Date().toLocaleString()}</em></p>
          </div>
        </div>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`,
      to: validatedEmail,
      subject: "Thank You for Contacting OsTutelage Academy! 🎓",
      headers: {
        "X-Mailin": "spf@brevo.com",
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #28a745;">Thank You for Reaching Out! 📧</h2>
          <p>Dear <strong>${escapeHtml(validatedName)}</strong>,</p>
          <p>We've received your message about <strong>"${escapeHtml(validatedSubject)}"</strong>. Our team will review it and get back to you within 24-48 hours.</p>
          <p>Check your inbox (and spam folder) for our response!</p>
          <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p>${validatedMessage.replace(/\n/g, '<br>')}</p>
          </div>
          <p><strong>Need urgent help?</strong> Contact us via:</p>
          <ul>
            <li>📱 WhatsApp: <a href="https://wa.me/2349036508361">+234 903 650 8361</a></li>
            <li>📧 Email: <a href="mailto:info@ostutelage.tech">info@ostutelage.tech</a></li>
          </ul>
          <p>Thanks for choosing OsTutelage Academy! 🚀</p>
          <p>Best,<br><strong>The OsTutelage Team</strong></p>
        </div>
      `,
    });

    return NextResponse.json({ 
      message: "Message sent successfully! We'll respond soon." 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Brevo Email Error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data || error.response,
      stack: error.stack,
    });

    if (error.response && typeof error.response === 'string' && error.response.includes("sender")) {
      return NextResponse.json(
        { message: "Email rejected by Brevo. Verify 'info@ostutelage.tech' in Brevo dashboard." },
        { status: 502 }
      );
    }

    if (error.code === "EAUTH") {
      return NextResponse.json(
        { message: "Brevo authentication failed. Check SMTP credentials in Vercel env vars." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}