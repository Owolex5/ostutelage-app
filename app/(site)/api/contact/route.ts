import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, whatsapp, phone } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST, // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT), // 587
      secure: false, // STARTTLS
      pool: true, // Reuse connections for better performance
      auth: {
        user: process.env.SMTP_USER, // Your Brevo SMTP Relay ID (e.g., 998233001) - NOT an email
        pass: process.env.SMTP_PASS, // Your Brevo SMTP Key (not API key)
      },
      tls: {
        rejectUnauthorized: false,
      },
      // Brevo-specific: Add connection timeouts and debug
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      debug: process.env.NODE_ENV === "development",
      logger: process.env.NODE_ENV === "development",
    });

    // Verify connection before sending (skip in dev for speed)
    if (process.env.NODE_ENV !== "development") {
      await transporter.verify();
      console.log("Brevo SMTP connection verified");
    }

    const verifiedSender = "info@ostutelage.tech"; // Must match your verified sender in Brevo

    // Helper to escape HTML (basic XSS prevention)
    const escapeHtml = (unsafe: string) => {
      return unsafe.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[m]);
    };

    // Email to OsTutelage (info@ostutelage.tech)
    await transporter.sendMail({
      from: `"OsTutelage Contact" <${verifiedSender}>`, // Fixed verified sender
      to: "info@ostutelage.tech",
      replyTo: email, // Allows easy reply to user
      subject: `New Contact Form Submission: ${subject}`,
      headers: {
        // Brevo deliverability boost (keep X-Mailin, drop X-Brevo-API)
        "X-Mailin": "spf@brevo.com",
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
            <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp || "Not provided")}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            <p><em>Submitted: ${new Date().toLocaleString()}</em></p>
          </div>
        </div>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${verifiedSender}>`, // Same verified sender
      to: email,
      subject: "Thank You for Contacting OsTutelage Academy! 🎓",
      headers: {
        "X-Mailin": "spf@brevo.com",
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #28a745;">Thank You for Reaching Out! 📧</h2>
          <p>Dear <strong>${escapeHtml(name)}</strong>,</p>
          <p>We've received your message about <strong>"${escapeHtml(subject)}"</strong>. Our team will review it and get back to you within 24-48 hours.</p>
          <p>Check your inbox (and spam folder) for our response!</p>
          <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p><strong>Urgent help?</strong> Contact us via:</p>
          <ul>
            <li>📱 WhatsApp: <a href="https://wa.me/2349036508361">+234 903 650 8361</a></li>
            <li>📧 Email: <a href="mailto:info@ostutelage.tech">info@ostutelage.tech</a></li>
          </ul>
          <p>Thanks for choosing OsTutelage Academy! 🚀</p>
          <p>Best,<br><strong>The OsTutelage Team</strong></p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully! We'll respond soon." }, { status: 200 });

  } catch (error: any) {
    console.error("Brevo Email Error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data || error.response, // Full Brevo rejection details
      stack: error.stack,
    });

    // Specific Brevo rejection handling
    if (error.response && (error.response as any).message?.includes("sender you used")) {
      return NextResponse.json(
        { message: "Email rejected by Brevo. Verify your sender/domain in Brevo dashboard." },
        { status: 502 }
      );
    }

    if (error.code === "EAUTH") {
      return NextResponse.json(
        { message: "Authentication failed. Check your Brevo SMTP credentials in env vars." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}