import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message, whatsapp } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    // 1️⃣ Create transporter (Gmail example, you can use your own SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app password
      },
    });

    // 2️⃣ Send email to info@ostutelage.tech
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "info@ostutelage.tech",
      subject: `[Contact Form] ${subject}`,
      html: `
        <h3>New Message from Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || "N/A"}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 3️⃣ Auto-reply email to the user
    await transporter.sendMail({
      from: `"Ostutelage Team" <info@ostutelage.tech>`,
      to: email,
      subject: "We Received Your Message",
      html: `
        <div style="font-family:sans-serif;line-height:1.5;color:#333">
          <h2 style="color:#0070f3;">Hello ${name},</h2>
          <p>Thank you for contacting Ostutelage. We have received your message:</p>
          <blockquote style="border-left:4px solid #0070f3; margin:1rem 0; padding-left:1rem; color:#555;">
            ${message}
          </blockquote>
          <p>Our team will get back to you shortly. If you checked WhatsApp, we may contact you there as well.</p>
          <p>Best regards,<br/>Ostutelage Team</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return res.status(500).json({ message: "Error sending message." });
  }
}
