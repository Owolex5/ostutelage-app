// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, whatsapp, phone } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // uses Vercel variable
  port: Number(process.env.SMTP_PORT),// uses Vercel variable
  secure: false,                       // STARTTLS
  auth: {
    user: process.env.SMTP_USER,       // uses Vercel variable
    pass: process.env.SMTP_PASS,       // uses Vercel variable
  },
  tls: {
    rejectUnauthorized: false,
  },
});


    // Email to OsTutelage (info@ostutelage.tech)
    await transporter.sendMail({
      from: `"OsTutelage Contact" <${process.env.SMTP_USER}>`,
      to: "info@ostutelage.tech",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Contact via WhatsApp:</strong> ${whatsapp}</p>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"OsTutelage Academy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Contacting OsTutelage Academy",
      html: `
        <h2>Thank You for Reaching Out!</h2>
        <p>Dear ${name},</p>
        <p>We have successfully received your message regarding "${subject}". Our team is reviewing your inquiry and will respond to you soon via email. Please keep an eye on your inbox (and spam/junk folder) for our reply.</p>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <p>If you have any urgent questions, feel free to reach us via WhatsApp at <a href="https://wa.me/2349036508361">+234 903 650 8361</a> or email us at <a href="mailto:info@ostutelage.tech">info@ostutelage.tech</a>.</p>
        <p>Thank you for choosing OsTutelage Academy!</p>
        <p>Best regards,<br/>The OsTutelage Team</p>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}